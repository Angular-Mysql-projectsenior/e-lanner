module.exports = (sequelize, Sequelize) => {
  const project = sequelize.define("project", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING
    },
    deadline: {
      type: Sequelize.DATE
    },
    Note: {
      type: Sequelize.STRING
    }
  });

  return project;
};



