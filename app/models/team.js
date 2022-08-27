const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    username: { type: String, required: true, unique: true },
    users: { type: [mongoose.Types.ObjectId], default: [] },
    owner: { type: mongoose.Types.ObjectId, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Team', TeamSchema)
