const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        Key: "id",
      }
    },

    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        Key: "id",
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
