//Setup Express web server

var express = require('express');
var mysql = require('mysql');

var cors = require('cors');
var bodyParser = require('body-Parser');
const router = express.Router();
var Sequelize = require('sequelize');
var config = require('../Databasemim/mimdbconfig');

var project = require('../Databasemim/mimdbmodel');
const db = require("../Databasemim");
//const project = db.project;


const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})

//mysql connection 

var Sequelize = new Sequelize(
  config.database,
  config.user,
  config.password, {
  logging: console.log,
  define: {
    timestamps: false
  }
}
);

// check db connection 

/*
connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err
  console.log('The solution is: ', rows[0].solution)
});


db.connect((err) => {

  if (err) throw err;
  else console.log('connection established..')
});

*/

db.sequelize.sync();

//rest apo crud 

app.get('/api', (req, res) => {
  res.send('Api is available!!');
});


app.use('/api/projects', router);
//this will add routing to your api.  
//your api endpoint  localhost:3000/api/project 

router.get('/projects', function (req, res) {
  project.findAll().
    then(function (projects) {
      res.status(200).json(projects);
    }, function (error) {
      res.status(500).send(error);
    });
});

// find all Project 
router.get('/project/:id', function (req, res) {
  project.findAll({
    where: {
      id: req.params.id
    }
  }).
    then(function (projects) {
      res.status(200).json(projects);
    }, function (error) {
      res.status(500).send(error);
    });
});


// find all SOLO Project 
router.get('/project/solo', function (req, res) {
project.findAll({ where: { solo: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
});

router.post('/project', function (req, res) {
  console.log(req.body);
  var data = {
    "project-Title": req.body.title,
    "project-Status": req.body.status,
    "project-Deadline": req.body.deadline,
    "project-Note": req.body.note,
  };
  project.create(data).
    then(function (projects) {
      res.status(200).json(projects);
    }, function (error) {
      res.status(500).send(error);
    });
});

router.put('/project/:id', function (req, res) {
  var data = {
    id: req.params.id,
    "project-Title": req.body.title,
    "project-Status": req.body.status,
    "project-Note": req.body.note,
  };
  project.update(data, {
    where: {
      id: data.id
    }
  }).then(function (project) {
    res.status(200).json(project);
  }, function (error) {
    res.status(500).send(error);
  });
});

router.delete('/project/:id', function (req, res) {
  var data = {
    id: req.params.id
  };
  project.destroy({
    where: {
      id: data.id
    }
  }).then(function (project) {
    res.status(200).json(project);
  }, function (error) {
    res.status(500).send(error);
  });
});





console.log('my api is running on port:' + port);  
