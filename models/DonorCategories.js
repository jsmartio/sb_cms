const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'donor_category',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    donorKey: {
      type: Sequelize.STRING
    },
    donorCategoryTitle: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    count: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
)
