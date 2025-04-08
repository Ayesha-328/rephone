import pool from "../db/connectDB.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';

// upload phone
const uploadPhone = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = req.user;
    const { brand, model, price, imei, color, image } = req.body;
    const client = await pool.connect();

    try {
        await client.query("BEGIN"); // Start transaction

        // if the phone brand and model exists in phone table
        const phoneInfo = await client.query(
            `SELECT * FROM "Phone" WHERE phone_brand = $1 AND phone_model = $2`,
            [brand, model]
        );
        if (phoneInfo.rows.length === 0) {
            return res.status(400).json({ message: "Phone info can not be found!!" });
        }

        console.log(phoneInfo.rows[0].phoneId);

        // check if the phone with imei number exists in ListedProduct table
        const existingPhone = await client.query(
            `SELECT * FROM "ListedProduct" WHERE "imeiNumber" = $1`,
            [imei]
        );
        if (existingPhone.rows.length > 0) {
            return res.status(400).json({ message: "Phone with this IMEI number already exists!" });
        }

        const uploadPhone = await client.query(
            `INSERT INTO "ListedProduct" ("sellerId", "phoneId", "imeiNumber", "phoneImage") 
         VALUES ($1, $2, $3, $4) RETURNING *`,
            [user.sellerid, phoneInfo.rows[0].phoneId, imei, image]
        );

        const productId = uploadPhone.rows[0].productid;
        await client.query("COMMIT"); // Commit transaction

        res.status(201).json({ message: `Phone ${productId} uploaded successfully!`, phone : uploadPhone.rows[0]
        });

    } catch (error) {
        await client.query("ROLLBACK"); // Rollback on error
        console.error("Error during uploading phone:", error);
        res.status(500).json({ error: "Product upload failed. Please try again." });
    } finally {
        client.release();
    }
};

// get all phones with their details
const getAllPhones = async (req, res) => {
    const client = await pool.connect();
    try {
        const products = await client.query(
            `SELECT lp.*, 
            p.*, 
            s."sellerType", s."profilePic", s."userName", 
            u.name AS "sellerName", u.email AS "sellerEmail", u."phoneNumber" AS "sellerContact"
             FROM "ListedProduct" lp
             LEFT JOIN "Phone" p ON lp."phoneId" = p."phoneId"
             LEFT JOIN "Seller" s ON lp."sellerId" = s.sellerid
             LEFT JOIN "User" u ON s.userid = u.userid`
        );

        // format the phone images
        products.rows.forEach(product => {
            product.profilePic = product.profilePic ? product.profilePic.toString('base64') : null;
            product.phoneImage = product.phoneImage 
            ? product.phoneImage.map(imageBuffer => imageBuffer.toString('base64')) 
            : [];
        });


        res.status(200).json(products.rows);
    } catch (error) {
        console.error("Error during getting all products:", error);
        res.status(500).json({ error: "Failed to get all products. Please try again." });
    } finally {
        client.release();
    }
};

// get a phone details
const getPhoneDetails = async (req, res) => {
    const client = await pool.connect();
    try {
        const phoneId = req.params.id;
        const phoneDetails = await client.query(
            `SELECT lp.*, 
            p.*, 
            s."sellerType", s."profilePic", s."userName", 
            u.name AS "sellerName", u.email AS "sellerEmail", u."phoneNumber" AS "sellerContact"
             FROM "ListedProduct" lp
             LEFT JOIN "Phone" p ON lp."phoneId" = p."phoneId"
             LEFT JOIN "Seller" s ON lp."sellerId" = s.sellerid
             LEFT JOIN "User" u ON s.userid = u.userid
             WHERE lp.productid = $1`,
            [phoneId]
        );
        if (phoneDetails.rows.length === 0) {
            return res.status(400).json({ message: `Phone with id ${phoneId} not found` });
        }

        const product = phoneDetails.rows[0];

        // format the phone images
        const phoneDetailsformatted = {
            ...product,
            profilePic: product.profilePic ? product.profilePic.toString() : null,
            phoneImage: product.phoneImage
            ? product.phoneImage.map(imageBuffer => imageBuffer.toString()) 
            : []
        };

        res.status(200).json(phoneDetailsformatted);
    } catch (error) {
        console.error("Error during getting phone details:", error);
        res.status(500).json({ error: "Failed to get phone details. Please try again." });
    } finally {
        client.release();
    }
};

// get all verified phones
const getVerifiedPhones = async (req, res) => {
    const client = await pool.connect();
    try {
        const verifiedPhones = await client.query(
            `SELECT lp.*, 
            p.*, 
            s."sellerType", s."profilePic", s."userName", 
            u.name AS "sellerName", u.email AS "sellerEmail", u."phoneNumber" AS "sellerContact"
             FROM "ListedProduct" lp
             LEFT JOIN "Phone" p ON lp."phoneId" = p."phoneId"
             LEFT JOIN "Seller" s ON lp."sellerId" = s.sellerid
             LEFT JOIN "User" u ON s.userid = u.userid
             WHERE lp.status = 'approved'`
        );
        res.status(200).json(verifiedPhones.rows);

        // format the phone images
        verifiedPhones.rows.forEach(product => {
            product.profilePic = product.profilePic ? product.profilePic.toString('base64') : null;
            product.phoneImage = product.phoneImage 
            ? product.phoneImage.map(imageBuffer => imageBuffer.toString('base64')) 
            : [];
        });
    } catch (error) {
        console.error("Error during getting all verified phones:", error);
        res.status(500).json({ error: "Failed to get all verified phones. Please try again." });
    } finally {
        client.release();
    }
};

// get all phones with pending status
const getPendingPhones = async (req, res) => {
    const client = await pool.connect();
    try {
        const pendingPhones = await client.query(
            `SELECT lp.*, 
            p.*, 
            s."sellerType", s."profilePic", s."userName", 
            u.name AS "sellerName", u.email AS "sellerEmail", u."phoneNumber" AS "sellerContact"
             FROM "ListedProduct" lp
             LEFT JOIN "Phone" p ON lp."phoneId" = p."phoneId"
             LEFT JOIN "Seller" s ON lp."sellerId" = s.sellerid
             LEFT JOIN "User" u ON s.userid = u.userid
             WHERE lp.status = 'pending'`
        );

        // format the phone images
        pendingPhones.rows.forEach(product => {
            product.profilePic = product.profilePic ? product.profilePic.toString('base64') : null;
            product.phoneImage = product.phoneImage 
            ? product.phoneImage.map(imageBuffer => imageBuffer.toString('base64')) 
            : [];
        });

        res.status(200).json(pendingPhones.rows);
    } catch (error) {
        console.error("Error during getting all pending phones:", error);
        res.status(500).json({ error: "Failed to get all pending phones. Please try again." });
    } finally {
        client.release();
    }
};

// update phone details of a phone
const updatePhone = async (req, res) => {
    const client = await pool.connect();
    try {
        const productId = req.params.id;
        const { imei, image } = req.body;
        const existingPhone = await client.query(
            `SELECT "phoneImage" FROM "ListedProduct" WHERE productId = $1`,
            [productId]
        );

        if (existingPhone.rows.length === 0) {
            return res.status(404).json({ message: `Phone with id ${productId} not found` });
        }

        const updatedImages = existingPhone.rows[0].phoneImage || [];
        updatedImages.push(...image);

        const updatePhone = await client.query(
            `UPDATE "ListedProduct" SET "imeiNumber" = $1, "phoneImage" = $2 WHERE productId = $3`,
            [imei, updatedImages, productId]
        );
        res.status(200).json({ message: `Phone ${productId} updated successfully!` });
    } catch (error) {
        console.error("Error during updating phone:", error);
        res.status(500).json({ error: "Failed to update phone. Please try again." });
    } finally {
        client.release();
    }
};

// delete an uploaded phone
const deletePhone = async (req, res) => {
    const client = await pool.connect();
    try {
        const productId = req.params.id;
        const deletePhone = await client.query(
            `DELETE FROM "ListedProduct" WHERE productid = $1`,
            [productId]
        );
        res.status(200).json({ message: `Phone ${productId} deleted successfully!` });
    } catch (error) {
        console.error("Error during deleting phone:", error);
        res.status(500).json({ error: "Failed to delete phone. Please try again." });
    } finally {
        client.release();
    }
};

// get all phone brands
const getPhoneBrands = async (req, res) => {
    const client = await pool.connect();
    try {
        const brands = await client.query(
            `SELECT DISTINCT phone_brand AS brand FROM "Phone"`
        );

        res.status(200).json(brands.rows);
    } catch (error) {
        console.error("Error while fetching phone brands:", error);
        res.status(500).json({ error: "Failed to fetch phone brands. Please try again." });
    } finally {
        client.release();
    }
};

// get all phone models of a brand
const getPhoneModels = async (req, res) => {
    const { brand } = req.params; // Brand is passed as a URL parameter
    const client = await pool.connect();
    try {
        const models = await client.query(
            `SELECT DISTINCT phone_model AS model FROM "Phone" WHERE phone_brand = $1`,
            [brand]
        );

        if (models.rows.length === 0) {
            return res.status(404).json({ error: "No models found for the selected brand." });
        }
        
        res.status(200).json(models.rows);
    } catch (error) {
        console.error("Error while fetching phone models:", error);
        res.status(500).json({ error: "Failed to fetch phone models. Please try again." });
    } finally {
        client.release();
    }
};
// const getPhoneModels = async (req, res) => {
//     const { brand } = req.params; // Brand is passed as a URL parameter
//     const { model, storage, ram } = req.body; // Model, storage, and RAM are passed in the request body
//     const client = await pool.connect();

//     try {
//         // Check if the brand exists and fetch its models
//         const models = await client.query(
//             `SELECT DISTINCT phone_model AS model FROM "Phone" WHERE phone_brand = $1`,
//             [brand]
//         );

//         // If no models exist for the brand, return an error
//         if (models.rows.length === 0 && !model) {
//             return res.status(404).json({ error: "No models found for the selected brand." });
//         }

//         // If a new model is provided in the request body, insert it into the Phone table
//         if (model) {
//             const existingModel = await client.query(
//                 `SELECT * FROM "Phone" WHERE phone_brand = $1 AND phone_model = $2`,
//                 [brand, model]
//             );

//             if (existingModel.rows.length === 0) {
//                 // Insert the new model into the Phone table
//                 await client.query(
//                     `INSERT INTO "Phone" (phone_brand, phone_model, storage, ram) 
//                      VALUES ($1, $2, $3, $4)`,
//                     [brand, model, storage || null, ram || null]
//                 );

//                 return res.status(201).json({ message: `New model '${model}' added to the brand '${brand}'.` });
//             } else {
//                 return res.status(400).json({ error: `Model '${model}' already exists for the brand '${brand}'.` });
//             }
//         }

//         // Return the list of models for the brand
//         res.status(200).json(models.rows);
//     } catch (error) {
//         console.error("Error while fetching or inserting phone models:", error);
//         res.status(500).json({ error: "Failed to fetch or insert phone models. Please try again." });
//     } finally {
//         client.release();
//     }
// };



// get all storage variants of a model


const getStorageVariants = async (req, res) => {
    const { model } = req.params;
    const client = await pool.connect();
    console.log(model);
    
    try {
        const storageVariants = await client.query(
            `SELECT DISTINCT phone_brand, phone_model, storage, ram FROM "Phone" 
            WHERE phone_model = $1`,
            [model]
        );

        if (storageVariants.rows.length === 0) {
            return res.status(404).json({ error: "No storage variants found for the selected model." });
        }

        res.status(200).json(storageVariants.rows);
    } catch (error) {
        console.error("Error while fetching storage variants:", error);
        res.status(500).json({ error: "Failed to fetch storage variants. Please try again." });
    } finally {
        client.release();
    }
};

export { 
    uploadPhone, 
    getAllPhones, 
    getPhoneDetails, 
    getVerifiedPhones, 
    getPendingPhones, 
    updatePhone,
    deletePhone,
    getPhoneBrands,
    getPhoneModels,
    getStorageVariants
};