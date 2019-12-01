const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    admin: {
      type: Sequelize.INTEGER
    },
    last_login: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    isDeleted: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
  },
  {
    timestamps: false
  }
)
