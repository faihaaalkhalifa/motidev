const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'enter the name of team'],
  },
  purpose: {
    type: String,
    required: [true, 'enter the purpose of team '],
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  members: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        default: '',
      },
    },
  ],
  joinRequests: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Team', teamSchema);
