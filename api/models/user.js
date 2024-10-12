
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // passwordResetToken: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    role: {
      type: DataTypes.ENUM('reader', 'editor', 'admin'),
      defaultValue: 'reader'
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false      
    }
    
  });
};