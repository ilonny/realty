var DataTypes = require("sequelize").DataTypes;
var _district = require("./district");
var _user = require("./user");

function initModels(sequelize) {
  var district = _district(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    district,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
