module.exports = {
  name: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true
  },
  tags: {
    type: Array
  },
  lastDateModified: {
    type: Date,
  }
};
