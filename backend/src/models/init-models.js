var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _district = require("./district");
var _realty = require("./realty");
var _rooms = require("./rooms");
var _series = require("./series");
var _state = require("./state");
var _type = require("./type");
var _user = require("./user");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var district = _district(sequelize, DataTypes);
  var realty = _realty(sequelize, DataTypes);
  var rooms = _rooms(sequelize, DataTypes);
  var series = _series(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);
  var type = _type(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    category,
    district,
    realty,
    rooms,
    series,
    state,
    type,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
