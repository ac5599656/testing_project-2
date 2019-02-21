module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define("Login", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    });
    Login.associate = (models) => {
        Login.belongsTo(models.Person, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Login;
};