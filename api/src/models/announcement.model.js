const { model, Schema } = require('mongoose');

const schema = new Schema({
  id: {
    type: Number,
    unique: true,
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

schema.index({ id: 1 });

module.exports = {
  Announcement: model('Announcement', schema),
};
