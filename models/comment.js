module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        time: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW
        }
    });
    Comment.associate = (models) => {
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    Comment.associate = (models) => {
        Comment.belongsTo(models.Person, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Comment;
};