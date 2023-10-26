const dbConfig = require("../db/config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.js")(sequelize, Sequelize);
db.district = require("./district.js")(sequelize, Sequelize);
db.series = require("./series.js")(sequelize, Sequelize);
db.rooms = require("./rooms.js")(sequelize, Sequelize);
db.state = require("./state.js")(sequelize, Sequelize);
db.type = require("./type.js")(sequelize, Sequelize);
db.category = require("./category.js")(sequelize, Sequelize);
db.realty = require("./realty.js")(sequelize, Sequelize);
db.owner = require("./owner.js")(sequelize, Sequelize);
db.developer = require("./developer.js")(sequelize, Sequelize);
db.apartment_complex = require("./apartment_complex.js")(sequelize, Sequelize);
db.communication = require("./communication.js")(sequelize, Sequelize);
db.document = require("./document.js")(sequelize, Sequelize);
module.exports = db;
