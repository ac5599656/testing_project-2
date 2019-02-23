// var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    let Users = sequelize.define("Users", {
      firstname: {
        type: DataTypes.STRING
        // allowNull: false,
        // validate: {
        //     len: [1]
        // }
      },
      lastname: {
        type: DataTypes.STRING
        // allowNull: false,
        // validate: {
        //     len: [1]
        // }
      },
     
      email: {
        type: DataTypes.STRING
        // allowNull: false,
        // validate: {
        //     len: [1]
        // }
      },
      age: {
        type: DataTypes.STRING,
        // allowNull: false,
        // validate: {
        //   len: [1]
        // }
      },
      gender: {
        type: DataTypes.STRING,
        // allowNull: false,
        // validate: {
        //   len: [1]
        // }
      },
      password: {
        type: DataTypes.STRING
        // allowNull: false,
        // validate: {
        //     len: [1]
        // }
      }
    });
    // Users.associate = (models) => {
    //   Users.hasMany(models.Post, {
    //     onDelete: "cascade"
    //   })
    // };
    // Users.associate = (models) => {
    //   Users.hasMany(models.Comment, {
    //     onDelete: "cascade"
    //   })
    // };


    //{
    //     instanceMethods: {
    //         generateHash: function (password) {
    //             return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    //         },
    //         validPassword: function (password) {
    //             return bcrypt.compareSync(password, this.password);
    //         },
    //     }
    // });
  
    // Users.hook('beforeCreate', function (user, options) {
    //     user.password = user.generateHash(user.password);
    // });
  
    return Users;
  };