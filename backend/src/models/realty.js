const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "realty",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rooms_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      series_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      agent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      house_floor_number: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      conditions: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      total_area: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      floor: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      documents: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rooms_count: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description_additional: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      photos: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      owner_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      agent_price: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      developer_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      apartment_complex_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      balcony: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      balcony_glass: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      communication_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      document_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      main_photo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      owner_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      owner_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      sequelize,
      tableName: "realty",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
