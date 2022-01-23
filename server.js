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
app.get('/create/tableprojects', (req, res) => {
	let sql = 'CREATE TABLE IF NOT EXISTS project (id_project INT NOT NULL AUTO_INCREMENT, title VARCHAR(100) NOT NULL , status VARCHAR(255) , note VARCHAR(255)  , deadline DATETIME , PRIMARY KEY (id_project) )';
	database.query(sql, (err, res) => {
		if (err) throw err;
		console.log(res );
		return res.send( `Table project is created successfully!`);
	});
});

app.get('/create/tableusers', (req, res) => {
	let sql = 'CREATE TABLE IF NOT EXISTS user (id_user INT NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL , password VARCHAR(255) NOT NULL , email VARCHAR(255) , PRIMARY KEY (id_user) , FOREIGN KEY (id_project) )';
	database.query(sql, (err, res) => {
		if (err) throw err;
		console.log(res );
		return res.send( `Table user is created successfully!`);
	});
});


require("./routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`  listening on port ${PORT}.`);
});


