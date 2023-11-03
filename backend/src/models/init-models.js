var DataTypes = require("sequelize").DataTypes;
var _apartment_complex = require("./apartment_complex");
var _category = require("./category");
var _communication = require("./communication");
var _developer = require("./developer");
var _district = require("./district");
var _district_parent = require("./district_parent");
var _document = require("./document");
var _owner = require("./owner");
var _realty = require("./realty");
var _rooms = require("./rooms");
var _series = require("./series");
var _state = require("./state");
var _type = require("./type");
var _user = require("./user");

function initModels(sequelize) {
  var apartment_complex = _apartment_complex(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var communication = _communication(sequelize, DataTypes);
  var developer = _developer(sequelize, DataTypes);
  var district = _district(sequelize, DataTypes);
  var district_parent = _district_parent(sequelize, DataTypes);
  var document = _document(sequelize, DataTypes);
  var owner = _owner(sequelize, DataTypes);
  var realty = _realty(sequelize, DataTypes);
  var rooms = _rooms(sequelize, DataTypes);
  var series = _series(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);
  var type = _type(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    apartment_complex,
    category,
    communication,
    developer,
    district,
    district_parent,
    document,
    owner,
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
