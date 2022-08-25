const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    image: { type: String, default: './defaults/default.png' },
    users: { type: [mongoose.Types.ObjectId], default: [] },
    owner: { type: mongoose.Types.ObjectId, required: true },
    team: { type: mongoose.Types.ObjectId },
    private: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Project', ProjectSchema)
