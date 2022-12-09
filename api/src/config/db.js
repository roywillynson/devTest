const mongoose = require('mongoose');
const { config } = require('./env');

module.exports = {
  async connect() {
    try {
      mongoose.set('strictQuery', true);
      const connection = await mongoose.connect(config.db.mongo.URI);
      return connection;
    } catch (err) {
      console.log(err);
    }
  },
};
