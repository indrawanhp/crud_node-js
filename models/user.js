const Sequelize = require("sequelize");
const db = require("../config/db");

const user = db.define(
    'user',
    {
        username : {type: Sequelize.STRING},
        email : {type: Sequelize.STRING},
        password : {type: Sequelize.STRING}
    },
    {
        freezeTableName: true
    }
);

module.exports = user;