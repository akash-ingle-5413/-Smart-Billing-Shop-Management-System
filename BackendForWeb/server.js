const express = require("express");
const cors = require("cors");
const port = 8080;

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


app.post("/", (req, res) => {

    res.send("RetailIQ API is running");

});


// Check if user exists
app.get("/api/user", (req, res) => {

    const email = req.query.email;

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.length > 0) {

            return res.json({
                exists: true,
                message: "User exists"
            });

        }

        return res.json({
            exists: false,
            message: "User does not exist"
        });

    });

});


app.listen(port, () => {

    console.log("Server running on port 8080");

});