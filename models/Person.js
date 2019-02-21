module.exports = function(sequelize, DataTypes) {
  const Person = sequelize.define("Person", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    
    age: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Person.associate = (models) => {
    Person.hasMany(models.Post, {
      onDelete: "cascade"
    })
  };
  Person.associate = (models) => {
    Person.hasMany(models.Comment, {
      onDelete: "cascade"
    })
  };
  Person.associate = (models) => {
    Person.hasMany(models.Login)
  };
  return Person;
};
