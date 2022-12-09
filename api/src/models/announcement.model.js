const { model, Schema } = require('mongoose');

const schema = new Schema({
  id: {
    type: Number,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = {
  Announcement: model('Announcement', schema),
};
