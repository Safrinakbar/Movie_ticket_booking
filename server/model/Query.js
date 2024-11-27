const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  query: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Query = mongoose.model("Query", querySchema);

module.exports = Query;
