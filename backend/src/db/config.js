require('dotenv').config()
module.exports = {
  HOST: "localhost",
  USER: process.env.LOCAL ? "root" : "mdc",
  PASSWORD: process.env.LOCAL ? "root" : "xC8zO6cI3lvM3j",
  DB: process.env.LOCAL ? "realty" : "realty",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
