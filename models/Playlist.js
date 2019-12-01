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
    playlist_key: {
      type: Sequelize.STRING
    },
    placement: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    startDate: {
      type: Sequelize.STRING
    },
    endDate: {
      type: Sequelize.STRING
    },
    startTime: {
      type: Sequelize.STRING
    },
    endTime: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.STRING
    },
    num_list_items: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)
