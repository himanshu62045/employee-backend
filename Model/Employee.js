const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
  joining_date: {
    type: Date,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
