const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeSchema = new Schema(
  {
    deadCount: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Time = mongoose.model('Time', TimeSchema);
module.exports = Time;
