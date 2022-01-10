//Setup Express web server



const express = require("express");
const cors = require("cors");
const mimdb = require("../Databasemim/mimdbmodel");



const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Angular - Mysql project!" });
});


mimdb.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
  console.log(" All projects were synchronized successfully!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
