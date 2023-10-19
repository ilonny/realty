const express = require("express");
const db = require("../models");
const state = db.state;
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

router.get("/", async function (req, res) {
    const list = await state.findAll({ raw: true });
    res.json(list);
    return;
});

router.get("/get-one", async function (req, res) {
    try {
        const { id } = req.query;
        const model = await state.findOne({
            where: { id },
        });
        res.json(model);
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            trace: e.message,
        });
    }
});

router.post("/create", async (req, res) => {
    try {
        const dataToSave = {
            ...req.body,
        };

        const filesCanBeSaved = ["photo"];

        if (req?.files) {
            filesCanBeSaved.forEach((docType) => {
                if (req?.files[docType]) {
                    let file = req?.files[docType];
                    let file_path =
                        "uploads/" + new Date().getTime() + file.name;
                    file.mv(file_path);
                    dataToSave[docType] = file_path;
                }
            });
        }

        const data = await state.create(dataToSave);
        res.json({
            success: true,
            message: "created successfully",
            data,
            id: data.id
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            trace: e.message,
        });
    }
});

router.post("/update", async (req, res) => {
    try {
        const { id } = req.body;
        const existedModel = await state.findOne({
            where: { id },
        });
        const dataToSave = omit("id", req.body);

        const filesCanBeSaved = ["photo"];

        if (req?.files) {
            filesCanBeSaved.forEach((docType) => {
                if (req?.files[docType]) {
                    let file = req?.files[docType];
                    let file_path =
                        "uploads/" + new Date().getTime() + file.name;
                    file.mv(file_path);
                    dataToSave[docType] = file_path;
                }
            });
        }

        await existedModel.update(dataToSave);
        res.json({
            success: true,
            message: "updated successfully",
            data: existedModel,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            trace: e.message,
        });
    }
});

router.post("/delete", async (req, res) => {
    try {
        const { id } = req.body;
        await state.destroy({ where: { id } });
        res.json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            trace: e.message,
        });
    }
});

module.exports = router;
