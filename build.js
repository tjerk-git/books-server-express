const { sequelize } = require('./models');

let connectionSetup = false;

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
  connectionSetup = true;
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// sync the models to the database
if (connectionSetup) {
  try {
    sequelize.sync();
  } catch (error) {
    console.log(error);
  }
}

