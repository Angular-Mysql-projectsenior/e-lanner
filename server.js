const express = require("express");
var mysql = require('mysql');
const database = require('./mimdb/mysqlconnection');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


app.use(express.urlencoded({ extended: false }));


app.get("/createdb", (req, res) => {

	let databaseName = "mimidb";
    // use the query to create a Database
	database.query(`CREATE DATABASE IF NOT EXISTS  ${databaseName}`, (err) => {
		if (err) throw err;
		console.log("Database Created Successfully !");
		let useQuery = `USE ${databaseName}`;
		database.query(useQuery, (error) => {
			if (error) throw error;
			console.log(`Using Database ${databaseName}`);
			return res.send(
				`Created and Using ${databaseName} Database`);
		})
	});
});

//create table
app.get('/create/tableproject', (req, res) => {
	let sql = 'CREATE TABLE IF NOT EXISTS project(id INT AUTOINCREMENT, title VARCHAR(100) NOT NULL , note VARCHAR(255) , note VARCHAR(255) , deadline DATETIME , PRIMARY KEY (id) )';
	database.query(sql, (err, res) => {
		if (err) throw err;
		console.log('Creating Table project ' );
		res.send(' Table is created successfully!');
	});
});

require("./routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`  listening on port ${PORT}.`);
});

