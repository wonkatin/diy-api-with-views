'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.country.belongsTo(models.continent)
    }
  };
  country.init({
    name: DataTypes.TEXT,
    founded: DataTypes.INTEGER,
    population: DataTypes.INTEGER,
    continentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'country',
  });
  return country;
};