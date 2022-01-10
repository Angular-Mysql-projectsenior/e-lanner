const mimdb = require("../Databasemim/mimdbmodel");
const project = require('../Databasemim/mimdbmodel');

const insertProject = () => {
  project.create()
    .then(() => {
      console.log("Database seeded successfully");
    })
    .catch((error) => {
      console.log("error seeding the database: ", error);
    })
    .finally(() => {
      mimdb.close();
    });
};

