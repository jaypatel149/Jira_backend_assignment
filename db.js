const mysql = require("mysql");
require("dotenv").config({path:"./.env"})

const connection = mysql.createConnection({
  host: process.env['DB_HOSTNAME'], // your host name
  user: process.env['DB_USER'], // db user name
  password: process.env['DB_PASSWORD'], // db password
  database: process.env['DB_NAME'], // db name
});

connection.connect();

module.exports = {
    connection : connection,
}