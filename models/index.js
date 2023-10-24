const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
});

// Define your model
const Post = sequelize.define('Post', {
  emoji: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { sequelize, Post };