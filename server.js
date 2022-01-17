const express = require("express");
var mysql = require('mysql');
const database = require('./mimdb/mysqlconnection');

const app = express();
app.use(express.json());


app.use(express.urlencoded({ extended: false }));


app.get("/createdb", (req, res) => {

	let databaseName = "mimidb";

	let createQuery = `CREATE DATABASE ${databaseName}`  ;

	// use the query to create a Database.
	database.query(`CREATE DATABASE IF NOT EXISTS  ${databaseName}`, (err) => {
		if(err) throw err;
		console.log("Database Created Successfully !");
		let useQuery = `USE ${databaseName}`;
		database.query(useQuery, (error) => {
			if(error) throw error;
		console.log("Using Database ");			
			return res.send(
`Created and Using ${databaseName} Database`);
		})
	});
});

require("./routes")(app);

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => {
  console.log(`  listening on port ${PORT}.`);
});

 