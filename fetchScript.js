const request = require("request");
const { connection } = require("./db");
require("dotenv").config({path:"./.env"})

const fetchdata = () => {
  const options = {
    url: "https://websitetechdom.atlassian.net/rest/api/2/search?jql=project=webtechdom",
    auth: {
      user: process.env['TOKEN_USERNAME'],
      pass: process.env['TOKEN_JIRA'],
    },
  };

  let result = request(options, (error, response, body) => {
    if (error) throw error;
    const data = JSON.parse(body);
    const issues = data.issues;
    const delete_sql = "DELETE FROM JiraTasks WHERE TRUE";
    connection.query(delete_sql, (error) => {
      if (error) throw error;
    });

    // console.log(issues, "issues");

    issues.forEach((issue) => {
      const sql =
        "INSERT INTO JiraTasks (id, title, description,reporter,status,dueDate) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description),reporter = VALUES(reporter),status = VALUES(status), dueDate = VALUES(dueDate)";
      const values = [
        issue.key,
        issue.fields.summary,
        issue.fields.description,
        issue.fields.reporter.displayName,
        issue.fields.status.name,
        issue.fields.duedate,
      ];
      connection.query(sql, values, (error) => {
        if (error) throw error;
      });
    });
    return true 
  });
  if(result){
    return true
  }
};

module.exports = {
  transferDataToDB: fetchdata
}