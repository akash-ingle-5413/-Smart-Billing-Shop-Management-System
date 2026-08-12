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
    const sql = "SELECT * FROM users WHERE email = ?";


    db.query(sql, [email], async (err, result) => {

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
                message: "Email is not registered"
            });

        }


        // User found
        const user = result[0];


        // Compare password
        const passwordCorrect = await(
            password,
            user.password
        );


        // Password incorrect
        if (!passwordCorrect) {

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


app.listen(port, () => {

    console.log(`Server running on port ${port}`);

});