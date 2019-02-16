module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
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
    Post.associate = (models) => {
        Post.belongsTo(models.Person, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Post;
};
