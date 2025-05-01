import pool from "../db/connectDB.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

// register seller
const registerSeller = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, phoneNumber, city, area, street, houseNumber, nearestLandmark, email, password, sellerType, profilePicture } = req.body;

    const client = await pool.connect();
    try {
        await client.query("BEGIN"); // Start transaction

        // Check if email already exists
        const existingUser = await client.query('SELECT * FROM "User" WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into user table
        const userResult = await client.query(
            `INSERT INTO "User" (name, "phoneNumber", city, area, street, "houseNumber", "nearestLandmark", email) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
             RETURNING userId`,
            [name, phoneNumber, city , area || null, street || null, houseNumber || null, nearestLandmark || null, email]
        );

        const userId = userResult.rows[0].userid;

        // Insert into seller table
        const sellerResult = await client.query(
            `INSERT INTO "Seller" ("userName", password, userid, "sellerType", "profilePic") 
             VALUES ($1, $2, $3, $4, $5) RETURNING sellerId`,
            [name, hashedPassword, userId, sellerType, profilePicture || null]
        );

        const sellerId = sellerResult.rows[0].sellerid;

        await client.query("COMMIT"); // Commit transaction

        // Generate token & set cookie
        // generateTokenAndSetCookie(userId, res);

        res.status(201).json({ message: "Seller registered successfully!", sellerId });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error("Error during seller registration:", error);
        res.status(500).json({ error: "Registration failed. Please try again." });
    } finally {
        client.release();
    }
};

// login seller
const loginSeller = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const client = await pool.connect();
    try {
        // Check if email exists
        const user = await client.query('SELECT * FROM "User" WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: "Invalid email address." });
        }

        // Check if password is correct
        const seller = await client.query('SELECT * FROM "Seller" WHERE userid = $1', [user.rows[0].userid]);
        if (seller.rows.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, seller.rows[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid Password!" });
        }

        // Generate token & set cookie
        generateTokenAndSetCookie(user.rows[0].userid, res);

        res.status(200).json({ message: "Login successful!" ,
            userId: user.rows[0].userid,
            sellerId: seller.rows[0].sellerid,
           
        });
    } catch (error) {
        console.error("Error during seller login:", error);
        res.status(500).json({ error: "Login failed. Please try again." });
    } finally {
        client.release();
    }
};

// get seller profile
const getSellerProfile = async (req, res) => {
    const { query } = req.params;
    const client = await pool.connect();
    try {
        const seller = await client.query(
            `SELECT u.name, u."phoneNumber", u.city, u.area, u.street, u."houseNumber", u."nearestLandmark", u.email, s."sellerType", s."profilePic"
             FROM "User" u JOIN "Seller" s ON u.userid = s.userid 
             WHERE u.userid = $1`,
            [query]
        );

        if (seller.rows.length === 0) {
            return res.status(404).json({ error: "Seller not found" });
        }

        // Format the profile picture
        const sellerData = seller.rows[0];
        if (sellerData.profilePic) {
            sellerData.profilePic = Buffer.from(sellerData.profilePic).toString('base64');
        }

        res.status(200).json(seller.rows[0]);
    } catch (error) {
        console.error("Error while fetching seller profile:", error);
        res.status(500).json({ error: "An error occurred while fetching seller profile" });
    } finally {
        client.release();
    }
};

// update seller profile
const updateSellerProfile = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { query } = req.params;
    const { name, phoneNumber, city, area, street, houseNumber, nearestLandmark, email, sellerType, profilePicture } = req.body;

    const client = await pool.connect();
    try {
        await client.query("BEGIN"); // Start transaction

        // Update user table
        const fieldsToUpdate = [];
        const values = [];
        let index = 1;

        if (name) {
            fieldsToUpdate.push(`"name" = $${index++}`);
            values.push(name);
        }
        if (phoneNumber) {
            fieldsToUpdate.push(`"phoneNumber" = $${index++}`);
            values.push(phoneNumber);
        }
        if (city) {
            fieldsToUpdate.push(`"city" = $${index++}`);
            values.push(city);
        }
        if (area) {
            fieldsToUpdate.push(`"area" = $${index++}`);
            values.push(area);
        }
        if (street) {
            fieldsToUpdate.push(`"street" = $${index++}`);
            values.push(street);
        }
        if (houseNumber) {
            fieldsToUpdate.push(`"houseNumber" = $${index++}`);
            values.push(houseNumber);
        }
        if (nearestLandmark) {
            fieldsToUpdate.push(`"nearestLandmark" = $${index++}`);
            values.push(nearestLandmark);
        }
        if (email) {
            fieldsToUpdate.push(`"email" = $${index++}`);
            values.push(email);
        }

        if (fieldsToUpdate.length > 0) {
            values.push(query);
            const updateQuery = `UPDATE "User" SET ${fieldsToUpdate.join(", ")} WHERE userid = $${index}`;
            await client.query(updateQuery, values);
        }

        // Update seller table
        const sellerFieldsToUpdate = [];
        const sellerValues = [];
        let sellerIndex = 1;

        if (sellerType) {
            sellerFieldsToUpdate.push(`"sellerType" = $${sellerIndex++}`);
            sellerValues.push(sellerType);
        }
        if (profilePicture) {
            sellerFieldsToUpdate.push(`"profilePic" = $${sellerIndex++}`);
            sellerValues.push(profilePicture);
        }

        if (sellerFieldsToUpdate.length > 0) {
            sellerValues.push(query);
            const sellerUpdateQuery = `UPDATE "Seller" SET ${sellerFieldsToUpdate.join(", ")} WHERE userid = $${sellerIndex}`;
            await client.query(sellerUpdateQuery, sellerValues);
        }

        await client.query("COMMIT"); // Commit transaction

        res.status(200).json({ message: "Seller profile updated successfully!" });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error("Error during seller profile update:", error);
        res.status(500).json({ error: "Profile update failed. Please try again." });
    } finally {
        client.release();
    }
};

// delete seller profile
const deleteSellerProfile = async (req, res) => {
    const { query } = req.params;
    const client = await pool.connect();
    try {
        await client.query("BEGIN"); // Start transaction

        // Delete from seller table
        await client.query(`DELETE FROM "Seller" WHERE userid = $1`, [query]);

        // Delete from user table
        await client.query(`DELETE FROM "User" WHERE userid = $1`, [query]);

        await client.query("COMMIT"); // Commit transaction

        res.status(200).json({ message: "Seller profile deleted successfully!" });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error("Error during seller profile deletion:", error);
        res.status(500).json({ error: "Profile deletion failed. Please try again." });
    } finally {
        client.release();
    }
}

// get all sellers
const getAllSellers = async (req, res) => {
    const client = await pool.connect();
    try {
        const sellers = await client.query(`SELECT u.name, u."phoneNumber", u.city, u.area, u.street, u."houseNumber", u."nearestLandmark", u.email, s."sellerType", s."profilePic"
             FROM "User" u JOIN "Seller" s ON u.userid = s.userid`);

        if (sellers.rows.length === 0) {
            return res.status(404).json({ error: "No sellers found" });
        }

        // Format the profile picture
        sellers.rows.forEach(seller => {
            if (seller.profilePic) {
                seller.profilePic = Buffer.from(seller.profilePic).toString('base64');
            }
        });

        res.status(200).json(sellers.rows);
    } catch (error) {
        console.error("Error while fetching all sellers:", error);
        res.status(500).json({ error: "An error occurred while fetching all sellers" });
    } finally {
        client.release();
    }
}


// get all listed phones of a seller
const getSellerPhones = async (req, res) => {
    const { sellerId } = req.params;
    const client = await pool.connect();
    try {
        const phones = await client.query(
            `SELECT lp.*, 
            p.*
             FROM "ListedProduct" lp
             LEFT JOIN "Phone" p ON lp."phoneId" = p."phoneId"
             WHERE lp."sellerId" = $1`,
            [sellerId]
        );

        if (phones.rows.length === 0) {
            return res.status(404).json({ error: "No phones found for this seller" });
        }
// format the phone images
        phones.rows.forEach(product => {
            product.phoneImage = product.phoneImage 
            ? product.phoneImage.map(imageBuffer => imageBuffer.toString('base64')) 
            : [];
        });

        res.status(200).json(phones.rows);
    } catch (error) {
        console.error("Error while fetching seller phones:", error);
        res.status(500).json({ error: "An error occurred while fetching seller phones" });
    } finally {
        client.release();
    }
}

// get all orders of a seller
const getSellerOrders = async (req, res) => {
    const { sellerId } = req.params;
    const client = await pool.connect();
    try {
        const orders = await client.query(
            `SELECT
  o."orderId",
  o."orderStatus",
  o."orderDate",

  u."name" AS buyerName,
  u."email" AS buyerEmail,
  u."phoneNumber" AS buyerPhoneNumber,
  u."city" AS buyerCity,

  SUM(oi."unitPrice") AS sellerTotalPrice,

  json_agg(
    json_build_object(
      'productId', lp."productid",
      'color', lp."color",
      'status', lp."status",
      'isSold', lp."isSold",
      'phoneImages', lp."phoneImage",
      'imeiNo', lp."imeiNumber",
      'brand', p."phone_brand",        -- Now coming from Phone table
      'model', p."phone_model"         -- Now coming from Phone table
    )
  ) AS soldProducts

FROM "SubOrder" so
INNER JOIN "Order" o ON so."orderId" = o."orderId"
INNER JOIN "User" u ON o."userId" = u."userid"
INNER JOIN "OrderItem" oi ON oi."subOrderId" = so."subOrderId"
INNER JOIN "ListedProduct" lp ON oi."productId" = lp."productid"
INNER JOIN "Phone" p ON lp."phoneId" = p."phoneId"   -- new join with Phone

WHERE so."sellerId" = $1
GROUP BY o."orderId", o."orderStatus", o."orderDate", u."name", u."email", u."phoneNumber", u."city"
ORDER BY o."orderDate" DESC;
`,
            [sellerId]
        );

        if (orders.rows.length === 0) {
            return res.status(404).json({ error: "No orders found for this seller" });
        }

        res.status(200).json(orders.rows);
    } catch (error) {
        console.error("Error while fetching seller orders:", error);
        res.status(500).json({ error: "An error occurred while fetching seller orders" });
    } finally {
        client.release();
    }
}




export { 
    registerSeller, 
    loginSeller, 
    getSellerProfile , 
    updateSellerProfile, 
    deleteSellerProfile, 
    getSellerPhones,
    getSellerOrders
};