const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
