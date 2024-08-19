'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.AllCode, {foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData'}) // FK
      User.belongsTo(models.AllCode, {foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData'}) // FK
      User.hasOne(models.Markdown, {foreignKey: 'doctorId'}) // PK
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};