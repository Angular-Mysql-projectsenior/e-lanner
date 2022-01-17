module.exports = app => {
    const projects = require("./controllers");
    var router = require("express").Router();
  
    // Create a new project
    router.post("/", projects.create);
  
    // Retrieve all projects
    router.get("/", projects.findAll);
  
    // Retrieve all solo projects
    router.get("/project/solo", projects.findAllsolo);
  
    // Retrieve a single project with id
    router.get("/project/:id", projects.findOne);
  
    // Update a project with id
    router.put("/project/:id", projects.update);
  
    // Delete a project with id
    router.delete("/project/:id", projects.delete);
  
    // Delete all projects
    router.delete("/deleteall", projects.deleteAll);
  
    app.use('/api', router);
  };


