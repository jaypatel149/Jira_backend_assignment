const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./db");
const { transferDataToDB } = require("./fetchScript");

app.use(cors());

connection.query(
  "CREATE TABLE IF NOT EXISTS JiraTasks (id VARCHAR(255), title VARCHAR(255), description VARCHAR(255),reporter VARCHAR(255),status VARCHAR(255),dueDate VARCHAR(255))",
  (error, results, fields) => {
    if (error) throw error;
  }
);

app.get("/get-tasks", async (req, res) => {
  connection.query("SELECT * FROM JiraTasks", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/reloadData", async (req, res) => {
  let result = await transferDataToDB();
  console.log(result, "----------------------->");
  if (result) {
    connection.query("SELECT * FROM JiraTasks", (error, results) => {
      if (error) throw error;
      // console.log(results);
      res.send(results);
    });
  }
});

app.listen(5005, () => {
  console.log("API listening on port 5005!");
});
