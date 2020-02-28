const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors({origin: true}))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use("/languages", require("./lib/languages/route"))
    .get("*", (_, res) => res.status(404).json({success: false, data: "Endpoint not found"}));

module.exports = app;


