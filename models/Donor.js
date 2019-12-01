const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'donor',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    donorKey: {
      type: Sequelize.STRING
    },
    donorName: {
      type: Sequelize.STRING
    },
    letter: {
      type: Sequelize.STRING
    },
    donor_order: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)
