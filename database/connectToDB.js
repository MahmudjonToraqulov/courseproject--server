const { Sequelize } = require('sequelize');
const config = require('./config')
const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize(
    process.env.POSTGRES_URL,
    {
        host: config.HOST,
        dialect: config.dialect,
        dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
    },
        pool: {
            max: config.pool.max,
            min: config.pool.min, 
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    },
    
)

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync({ alter: true })
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;