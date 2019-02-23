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
         Post.belongsTo(models.User, {
            foreignKey: {
                defaultValue: 1,
                allowNull: false
            }
         });
    };
    // Post.associate = (models) => {
    //     Post.hasMany(models.Comment, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
    return Post;
};