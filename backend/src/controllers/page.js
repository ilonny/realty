const express = require("express");
const db = require("../models");
const district_parent = db.district_parent;
const router = express.Router();
const authMiddleWare = require("../middleware/auth");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const sha1 = require("js-sha1");
const fetch = require("node-fetch");
const fs = require("fs");
const moment = require("moment");
// import fetch from "node-fetch";

function omit(key, obj) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}

router.get("/about", async function (req, res) {
    const response = await fetch("https://jbnestate.tilda.ws/about");
    const body = await response.text();
    res.send(body);
    return;
});

module.exports = router;
