import pool from "../db/connectDB.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

// register admin
const registerAdmin = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, password, email } = req.body;

    const client = await pool.connect();
    try {
        await client.query("BEGIN"); // Start transaction

        // Check if email already exists
        const existingAdmin = await client.query('SELECT * FROM "Admin" WHERE email = $1', [email]);
        if (existingAdmin.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered as Admin" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into admin table
        const adminResult = await client.query(
            `INSERT INTO "Admin" ("adminName", password, email) 
             VALUES ($1, $2, $3) 
             RETURNING "adminId"`,
            [name, hashedPassword, email]
        );

        const adminId = adminResult.rows[0].adminId;

        await client.query("COMMIT"); // Commit transaction

        // Generate token & set cookie
        // generateTokenAndSetCookie(userId, res);

        res.status(201).json({ message: "Admin registered successfully!", adminId });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error("Error during Admin registration:", error);
        res.status(500).json({ error: "Registration failed. Please try again." });
    } finally {
        client.release();
    }
};

// admin login
const loginAdmin = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const client = await pool.connect();
    try {
        // Check if email exists
        const admin = await client.query('SELECT * FROM "Admin" WHERE email = $1', [email]);
        if (admin.rows.length === 0) {
            return res.status(400).json({ error: "Invalid email address." });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, admin.rows[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid Password!" });
        }

        // Generate token & set cookie
        generateTokenAndSetCookie(admin.rows[0].adminId, res);

        res.status(200).json({
            message: "Login successful!",
            adminId: admin.rows[0].adminId,

        });
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ error: "Admin Login failed. Please try again." });
    } finally {
        client.release();
    }
};

// admin dashboard analytics
const getAdminDashboardAnalytics = async (req, res) => {
    // total users
    const totalUsers = await pool.query('SELECT COUNT(*) FROM "User"');

    // total sellers
    const totalSellers = await pool.query('SELECT COUNT(*) FROM "Seller"');

    // total business accounts
    const totalBusinessAccounts = await pool.query('SELECT COUNT(*) FROM "Business"');

    // tatal verified phones
    const totalVerifiedPhones = await pool.query('SELECT COUNT(*) FROM "ListedProduct" WHERE status = "verified"');

    // ongoing disputes

    // total transactions today

    // total revenue generated

    res.status(200).json({
        message: "Admin dashboard analytics",
        totalUsers: totalUsers.rows[0].count,
        totalVerifiedPhones: totalVerifiedPhones.rows[0].count,
        totalSellers: totalSellers.rows[0].count,
        totalBusinessAccounts: totalBusinessAccounts.rows[0].count,
        // ongoingDisputes: 0,
        // totalTransactionsToday: 0,
        // totalRevenueGenerated: 0,
    });
};

// get verification requests list
const getVerificationRequestsList = async (req, res) => {
    const client = await pool.connect();
    try {
        const verificationRequests = await client.query(`SELECT lp."phoneImage", lp."imeiNumber", lp."submitDate",
            p.*, 
            s."sellerType", 
            u.name AS "sellerName", u.email AS "sellerEmail", u."phoneNumber" AS "sellerContact"
             FROM "ListedProduct" lp
             LEFT JOIN "Phone" p ON lp."phoneId" = p."phoneId"
             LEFT JOIN "Seller" s ON lp."sellerId" = s.sellerid
             LEFT JOIN "User" u ON s.userid = u.userid
             WHERE lp.status = 'pending'`);

             // format the phone images
        verificationRequests.rows.forEach(product => {
            product.phoneImage = product.phoneImage 
            ? product.phoneImage.map(imageBuffer => imageBuffer.toString('base64')) 
            : [];
        });


        res.status(200).json({ message: "Verification requests", requests: verificationRequests.rows });
    } catch (error) {
        console.error("Error fetching verification requests:", error);
        res.status(500).json({ error: "Failed to fetch verification requests." });
    } finally {
        client.release();
    }
}

// get phones status from imei.info api
const getVerificationStatus = async (req, res) => {
    const { imei } = req.params;
    const client = await pool.connect();
    try {
        // Fetch the phone details from the database
        const phoneDetails = await client.query(
            `SELECT lp."phoneImage", lp."submitDate",
             p."phone_brand", p."phone_model", s."sellerType", u.name AS "sellerName", u.email AS "sellerEmail"
             FROM "ListedProduct" lp
             LEFT JOIN "Phone" p ON lp."phoneId" = p."phoneId"
             LEFT JOIN "Seller" s ON lp."sellerId" = s.sellerid
             LEFT JOIN "User" u ON s.userid = u.userid
             WHERE lp."imeiNumber" = $1`,
            [imei]
        );

        if (phoneDetails.rows.length === 0) {
            return res.status(404).json({ error: "Phone not found." });
        }

        // Format the phone images
        phoneDetails.rows.forEach(product => {
            product.phoneImage = product.phoneImage
                ? product.phoneImage.map(imageBuffer => imageBuffer.toString('base64'))
                : [];
        });

        // Call the imei.info API to get the verification status
        const apiResponse = await fetch(
            `https://dash.imei.info/api/check/27/?API_KEY=${process.env.IMEI_INFO_API_KEY}&imei=${imei}`
        );

        if (!apiResponse.ok) {
            const errorResponse = await apiResponse.json();
            return res.status(500).json({ error: "Failed to fetch verification status from imei.info.", details: errorResponse });
        }

        const apiResponseData = await apiResponse.json();
        console.log("First API Response:", apiResponseData);

        const ulid = apiResponseData.ulid;
        if (!ulid) {
            return res.status(500).json({ error: "ULID not found in the API response." });
        }

        // Use setTimeout to delay the verification status API call by 2 seconds
        setTimeout(async () => {
            try {
            const verificationStatusResponse = await fetch(`https://dash.imei.info/api/search_history/${ulid}`);
            if (!verificationStatusResponse.ok) {
                return res.status(500).json({ error: "Failed to fetch verification status history." });
            }

            const verificationStatus = await verificationStatusResponse.json();
            console.log("Verification Status:", verificationStatus);

            // Return the verification status along with phone details
            res.status(200).json({
                message: "Phone verification status",
                phoneDetails: {
                ...phoneDetails.rows[0],
                verificationStatus: verificationStatus.result,
                },
            });
            } catch (error) {
            console.error("Error fetching verification status:", error);
            res.status(500).json({ error: "Failed to fetch verification status." });
            }
        }, 2000); // Delay of 2 seconds

    } catch (error) {
        console.error("Error fetching phone verification status:", error);
        res.status(500).json({ error: "Failed to fetch phone verification status." });
    } finally {
        client.release();
    }
};

// update verification status
const verifyPhone = async (req, res) => {
    const { imei } = req.params;
    const { status } = req.body; // status can be 'verified' or 'rejected'

    // if status is not verified or rejected, return error
    if (status !== 'verified' && status !== 'rejected') {
        return res.status(400).json({ error: "Invalid status. Must be 'verified' or 'rejected'." });
    }

    const client = await pool.connect();
    try {
        await client.query("BEGIN"); // Start transaction
        // check if imei is valid
        const phone = await client.query(
            `SELECT * FROM "ListedProduct" WHERE "imeiNumber" = $1`,
            [imei]
        );
        if (phone.rows.length === 0) {
            return res.status(404).json({ error: "Phone not found." });
        }
        
        // Update the verification status in the database and the verified by admin id
        await client.query(
            `UPDATE "ListedProduct" SET status = $1, "approvedBy"=$2 WHERE "imeiNumber" = $3`,
            [status, req.admin.adminId, imei]
        );

        await client.query("COMMIT"); // Commit transaction

        res.status(200).json({ message: `Phone ${status} successfully!` });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error("Error updating verification status:", error);
        res.status(500).json({ error: "Failed to update verification status." });
    } finally {
        client.release();
    }
}

// get the list of all the verified phones along with the details of the admin who verified it
const getVerifiedPhonesList = async (req, res) => {
    const client = await pool.connect();
    try {
        const verifiedPhones = await client.query(`SELECT lp."phoneImage", lp."imeiNumber", lp."submitDate",
            p."phone_brand", p."phone_model", 
            s."sellerType", 
            u.name AS "sellerName", u.email AS "sellerEmail", u."phoneNumber" AS "sellerContact",
            a."adminName", a.email AS "adminEmail"
             FROM "ListedProduct" lp
             LEFT JOIN "Phone" p ON lp."phoneId" = p."phoneId"
             LEFT JOIN "Seller" s ON lp."sellerId" = s.sellerid
             LEFT JOIN "User" u ON s.userid = u.userid
             LEFT JOIN "Admin" a ON lp."approvedBy" = a."adminId"
             WHERE lp.status = 'verified'`);

             // format the phone images
        verifiedPhones.rows.forEach(product => {
            product.phoneImage = product.phoneImage 
            ? product.phoneImage.map(imageBuffer => imageBuffer.toString('base64')) 
            : [];
        });

        res.status(200).json({ message: "Verified phones list", phones: verifiedPhones.rows });
    } catch (error) {
        console.error("Error fetching verified phones:", error);
        res.status(500).json({ error: "Failed to fetch verified phones." });
    } finally {
        client.release();
    }
}

export { 
    registerAdmin, 
    loginAdmin, 
    getAdminDashboardAnalytics,
    getVerificationRequestsList,
    getVerificationStatus,
    verifyPhone,
    getVerifiedPhonesList
};