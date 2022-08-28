const mongoose = require('mongoose')

const InviteRequest = new mongoose.Schema({
  teamId: { type: mongoose.Types.ObjectId, required: true },
  caller: { type: String, required: true },
  requestedDate: { type: Date, default: new Date() },
  status: { type: String, default: 'pending' }
})

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    profile_image: { type: String, default: '' },
    mobile: { type: Number, required: true, unique: true },
    role: { type: [String], default: ['USER'] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    team: { type: [mongoose.Types.ObjectId], default: [] },
    token: { type: String, default: '' },
    invitedRequests: { type: [InviteRequest] }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)
