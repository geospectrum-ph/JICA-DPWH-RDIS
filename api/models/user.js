
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
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false      
    },
    role_access: {
      type: DataTypes.ENUM('admin', 'ro', 'deo'),
      defaultValue: 'admim'
    },
    ro: {
      type: DataTypes.STRING,
      allowNull: false      
    },
    deo: {
      type: DataTypes.STRING,
      allowNull: false      
    }
    
  });
};