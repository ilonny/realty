const path = require("path");
const { initializeApp, cert } = require("firebase-admin/app");
const serviceAccount = require("./mdcmoscow-a51ee-firebase-adminsdk-xfnbf-c05157659c.json");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const Strategy = require("passport-http-bearer").Strategy;
const fileUpload = require("express-fileupload");
const userController = require("./controllers/user");
const db = require("./models");
db.sequelize.sync();
const port = 3001;
const app = express();

// app.use("/uploads", express.static(__dirname + "../uploads"));
var dir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(dir));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

passport.use(
  new Strategy(function (token, cb) {
    db.user
      .findOne({
        where: {
          access_token: token,
        },
      })
      .then((user) => {
        if (!user) {
          return cb({ name: "Authentication failed" });
        } else {
          return cb(null, user);
        }
      })
      .catch(() => {
        return cb({ name: "Authentication failed" });
      });
  })
);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

initializeApp({
  credential: cert(serviceAccount),
});

app.use("/user", userController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
