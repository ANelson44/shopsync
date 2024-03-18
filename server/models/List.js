const mongoose = require('mongoose');

const { Schema } = mongoose;

const listSchema = new Schema({
  createdDate: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  ]
});

const List = mongoose.model('List', listSchema);

module.exports = List;
