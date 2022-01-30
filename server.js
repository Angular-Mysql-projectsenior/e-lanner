const express = require("express");
var mysql = require('mysql');
const database = require('./mimdb/mysqlconnection');
const cors = require("cors");
const db = require("./mimdb");
const project = db.projects ;

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));


db.sequelize.sync({ force: true }).then(() => {
	console.log("Drop and re-sync db.");
});


app.get("/createdb", (_req, res) => {
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

//create tables projet & users 
app.get('/createtableprojects', (Res, _req, _next) => {
	let sql = 'CREATE TABLE IF NOT EXISTS project (id_project INT NOT NULL AUTO_INCREMENT, title VARCHAR(100) NOT NULL , status VARCHAR(255) , note VARCHAR(255)  , deadline DATETIME , PRIMARY KEY (id_project) , CONSTRAINT fk_id_user FOREIGN KEY(id_user) REFERENCES users(id_user)  )';
	database.query(sql, (err, res) => {
		if (err) throw err;
		console.log(res);
		Res.send('Table project is created successfully!');
		_next();
	});
});


require("./routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`  listening on port ${PORT}`);
});


