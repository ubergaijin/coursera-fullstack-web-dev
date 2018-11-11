const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;