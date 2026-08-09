const express = require("express");
const cors = require("cors");
const port = 8080;

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {

    res.send("RetailIQ API is running");

});


app.listen(port, () => {

    console.log("Server running on port 8080");

});