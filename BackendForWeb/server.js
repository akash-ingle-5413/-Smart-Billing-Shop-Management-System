const express = require("express");
const cors = require("cors");
// const bcrypt = require("bcrypt");

const port = 8080;

const db = require("./db");

const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Test API
app.get("/", (req, res) => {

    res.send("RetailIQ API is running");

});


// LOGIN API
app.post("/api/login", (req, res) => {

    const { email, password } = req.body;


    // Check email and password
    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });

    }


    // Find user by email
   
    const sql = `

    SELECT * FROM users
    WHERE email = ? OR mobile = ?

      `;


    db.query(sql, [email, email], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Database error"
            });

        }


        // Email doesn't exist
        if (result.length === 0) {

            return res.status(401).json({
                success: false,
                message: "Email or mobile number is not registered"
            });

        }


        // User found
        const user = result[0];




        // Password incorrect
        if (password !== user.password) {

            return res.status(401).json({

                success: false,
                message: "Password is wrong"

            });

        }



        // Login successful
        return res.status(200).json({

            success: true,

            message: "Login successful",

            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }

        });

    });

});

// REGISTER API
app.post("/api/register", (req, res) => {

    const { shopName, fullName, email, password } = req.body;

    if (!shopName || !fullName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // Input can be an email or a mobile number
    const isEmail = email.includes("@");
    const emailValue = isEmail ? email : null;
    const mobileValue = isEmail ? null : email;

    // Check if user already exists
    const checkSql = `SELECT id FROM users WHERE email = ? OR mobile = ?`;

    db.query(checkSql, [email, email], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (result.length > 0) {
            return res.status(409).json({
                success: false,
                message: "User already registered"
            });
        }

        const insertSql = `
            INSERT INTO users (shop_name, name, email, mobile, password)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(insertSql, [shopName, fullName, emailValue, mobileValue, password], (err2) => {

            if (err2) {
                console.log(err2);
                return res.status(500).json({
                    success: false,
                    message: "Could not register user"
                });
            }

            return res.status(201).json({
                success: true,
                message: "Registration successful"
            });

        });

    });

});

app.listen(port, () => {

    console.log(`Server running on port ${port}`);

});