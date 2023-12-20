const express = require("express");
const db = require("../models");
const realty = db.realty;
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
    const list = await realty.findAll({ raw: true });
    res.json(list);
    return;
});

router.get("/get-one", async function (req, res) {
    try {
        const { id } = req.query;
        const model = await realty.findOne({
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

        const filesCanBeSaved = ["photos"];
        let paths = [];
        if (req?.files) {
            console.log("req?.files", req?.files);
            filesCanBeSaved.forEach((docType) => {
                if (req?.files[docType]) {
                    if (!Array.isArray(req?.files[docType])) {
                        req.files[docType] = [req?.files[docType]]
                    }
                        req?.files[docType].forEach((file) => {
                            let file_path =
                                "uploads/" + new Date().getTime() + file.name;
                            file.mv(file_path);
                            paths.push(file_path);
                        });
                }
                dataToSave[docType] = JSON.stringify(paths);
            });
            if (req?.files["main_photo"]) {
                let file = req?.files["main_photo"];
                let file_path = "uploads/" + file.name;
                file.mv(file_path);
                dataToSave["main_photo"] = file_path;
            }
        }

        const data = await realty.create(dataToSave);
        res.json({
            success: true,
            message: "created successfully",
            data,
            id: data.id,
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
        const { id, photos, oldFilesForSave } = req.body;
        const existedModel = await realty.findOne({
            where: { id },
        });
        const dataToSave = omit("id", req.body);
        let oldSaved = [];
        try {
            oldSaved = JSON.parse(existingModel.photos);
        } catch (e) {}
        const filesCanBeSaved = ["photos"];
        let paths = [];

        if (photos) {
            oldSaved = _.union(oldSaved, JSON.parse(photos));
        }
        if (oldFilesForSave) {
            console.log("oldFilesForSave saving", oldFilesForSave);
            oldSaved = _.union(oldSaved, JSON.parse(oldFilesForSave));
        }

        if (req?.files) {
            console.log("req?.files", req?.files);
            filesCanBeSaved.forEach((docType) => {
                if (req?.files[docType]) {
                    if (!Array.isArray(req.files[docType])) {
                        req.files[docType] = [req.files[docType]];
                    }
                    req?.files[docType].forEach((file) => {
                        let file_path = "uploads/" + file.name;
                        file.mv(file_path);
                        paths.push(file_path);
                    });
                }
            });
            if (req?.files["main_photo"]) {
                let file = req?.files["main_photo"];
                let file_path = "uploads/" + file.name;
                file.mv(file_path);
                dataToSave["main_photo"] = file_path;
            }
        }
        dataToSave["photos"] = JSON.stringify(_.union(oldSaved, paths));
        if (dataToSave["photos"].length <= 5) {
            delete dataToSave["photos"];
        }
        console.log("oldSaved", oldSaved);
        console.log("oldFilesForSave", oldFilesForSave);

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
        await realty.destroy({ where: { id } });
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
