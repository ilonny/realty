const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('realty', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    district_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rooms_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    series_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    agent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    house_floor_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    conditions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    total_area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    documents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rooms_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description_additional: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photos: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    owner_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    agent_price: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    developer_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    apartment_complex_id: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'realty',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
