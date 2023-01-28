const mysql = require("mysql");
const request = require("request");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jay@123",
  database: "jira",
});

connection.connect();

module.exports = {
    connection : connection,
}