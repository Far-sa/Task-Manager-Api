const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true },
    role: { type: [String], default: ['USER'] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    team: { type: [mongoose.Types.ObjectId], default: [] },
    token: { type: String, default: '' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)
