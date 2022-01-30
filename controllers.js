const db = require("./mimdb");
const project = db.projects;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Save project in the database
  project.create(project)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the project."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  project.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  project.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find project with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving project with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  project.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "successfully updated ."
        });
      } else {
        res.send({
          message: `Cannot update this project id=${id} `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating project with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  project.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "project was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete project with id=${id}. Maybe project was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete project with id=" + id
      });
    });
};



exports.deleteAll = (req, res) => {
  project.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} projects were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all projects."
      });
    });
};



