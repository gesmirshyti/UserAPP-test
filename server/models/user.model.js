const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    default: 'student',
    validate: {
      validator: async function () {
        // Check if there is already a user with the "teacher" role
        const existingTeacher = await this.constructor.findOne({ role: 'teacher' });
        return !existingTeacher || this.role === 'student';
      },
      message: 'Only one user can be a teacher.',
    },
  },
  email: { type: String, required: true, unique: true },
  // dob: {type:Date, required: true},
  imageURL:{type:String}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
