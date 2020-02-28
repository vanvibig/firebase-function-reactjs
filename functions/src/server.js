const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors({origin: true}))
    .use(express.static(path.join(__dirname, '../client/build')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use("/languages", require("./lib/languages/route"))
    .get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    })
    .get("*", (_, res) => res.status(404).json({success: false, data: "Endpoint not found"}));

module.exports = app;


