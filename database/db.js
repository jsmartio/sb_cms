const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('envision', 
                                'envisionu', 
                                'w8!4fCj433ee', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
  freezeTableName: true,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
