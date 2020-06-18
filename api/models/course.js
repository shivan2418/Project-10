const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init(
    {
       userId:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: '"title" is required' } },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: { notEmpty: { msg: '"description" is required' } },
      },
      estimatedTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    { sequelize });
  Course.associate = (models) => {
    Course.belongsTo(models.User, {foreignKey:{fieldName:'userId',allowNull:false}});
  };

  return Course;
};
