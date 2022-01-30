module.exports = app => {
    const projects = require("./controllers");
    var router = require("express").Router();
  
    // Create a new project
    router.post("/createnewproject", projects.create);
  
    // Retrieve all projects
    router.get("/all", projects.findAll);
  
    // Retrieve all solo projects
    router.get("/solo", projects.findAllsolo);
  
    // Retrieve a single project with id
    router.get("/:id", projects.findOne);
  
    // Update a project with id
    router.put("/:id", projects.update);
  
    // Delete a project with id
    router.delete("/:id", projects.delete);
  
    // Delete all projects
    router.delete("/deleteall", projects.deleteAll);
  
    app.use('/api/project', router);
  };

  

