const express = require("express");
const GreenSMS = require("greensms");
const db = require("../models");
const user = db.user;
const userData = db.userData;
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

router.post("/registration", async function (req, res) {
    const phone = req?.body?.phone || "";
    if (!phone) {
        res.json({
            success: false,
            message: "Неверно указан номер",
        });
    }
    const existedUser = await user.findOne({
        where: {
            phone,
        },
    });
    if (existedUser) {
        res.json({
            success: false,
            message: "Пользователь уже зарегистрирован",
        });
    } else {
        const newUser = user
            .create({
                phone,
                username: phone,
            })
            .then((data) => {
                if (data) {
                    res.send({
                        success: true,
                        message: "На указанный номер выслан код",
                    });
                } else {
                    res.json({
                        success: false,
                        message: "Ошибка при регистрации",
                    });
                }
            });
    }
});

router.post("/admin/login", async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        res.json({
            success: false,
            message: "Введите логин и пароль",
        });
        return;
    }
    const passwordHash = sha1(password);
    const existedUser = await user.findOne({
        where: { password: passwordHash, login },
    });
    if (existedUser) {
        existedUser.access_token = jwt.sign(passwordHash, "mdcsecret");
        await existedUser.save();
        res.send(existedUser);
    } else {
        res.json({
            success: false,
            message: "Неверный логин или пароль",
        });
    }
});

router.use("/protected", authMiddleWare);
router.use((err, req, res, next) => {
    let responseStatusCode = 500;
    let responseObj = {
        success: false,
        data: [],
        error: err,
        message: "There was some internal server error",
    };

    if (!_.isNil(err)) {
        if (err.name === "Authentication failed") {
            responseStatusCode = 401;
            responseObj.message =
                "You cannot get the details. You are not authorized to access this protected resource";
        }
    }

    if (!res.headersSent) {
        res.status(responseStatusCode).json(responseObj);
    }
});

router.get("/protected", async (req, res) => {
    res.send("protected router");
});

router.get("/protected/user-list", async function (req, res) {
    const authString = req.headers.authorization;
    const currentUser = await user.findOne({
        where: {
            access_token: authString.replace("Bearer ", ""),
        },
        raw: true,
    });

    let list;
    list = await user.findAll({ raw: true });
    // if (currentUser.role === "admin") {
    // } else {
    //     list = await user.findAll({
    //         raw: true,
    //         where: { id: currentUser.id },
    //     });
    // }
    res.json(list);
    return;
});

router.get("/protected/user-list-all", async function (req, res) {
    let list;
    list = await user.findAll({ raw: true });

    res.json(list);
    return;
});

router.post("/protected/user-delete", async (req, res) => {
    try {
        const existedUser = await user.findOne({
            where: { id: req.body.id },
        });
        await existedUser.update({
            deleted: "1",
        });
        res.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (e) {
        res.json({
            success: false,
            message: "user is not found",
        });
    }
});

router.post("/protected/user-restore", async (req, res) => {
    try {
        const existedUser = await user.findOne({
            where: { id: req.body.id },
        });
        await existedUser.update({
            deleted: "0",
        });
        res.json({
            success: true,
            message: "User restored successfully",
        });
    } catch (e) {
        res.json({
            success: false,
            message: "user is not found",
        });
    }
});

router.post("/protected/user-create", async (req, res) => {
    try {
        // const { username = "", email = "", phone } = req.body;
        // const data = await user.create({ username, email, phone, confirmed: 1 });

        const dataToSave = {
            ...req.body,
            password: sha1(req.body.password),
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

        const data = await user.create(dataToSave);
        res.json({
            success: true,
            message: "User created successfully",
            data,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            trace: e.message,
        });
    }
});

router.get("/protected/user", async (req, res) => {
    try {
        const { id } = req.query;
        const existedUser = await user.findOne({
            where: { id },
        });
        res.json(existedUser);
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            trace: e.message,
        });
    }
});

router.post("/protected/user-update", async (req, res) => {
    try {
        const { id, disabled } = req.body;
        const existedUser = await user.findOne({
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

        if (disabled === "false" || !disabled) {
            dataToSave.disabled = null;
        } else {
            dataToSave.disabled = disabled;
        }

        await existedUser.update(dataToSave);
        res.json({
            success: true,
            message: "User updated successfully",
            data: existedUser,
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
