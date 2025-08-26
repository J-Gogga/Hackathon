const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  summary: { type: String },
  priority: { type: String, default: "Medium" }, // Low / Medium / High
  tags: { type: [String] },
  status: { type: String, default: "Pending" }, // Pending / In Progress / Resolved
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', IssueSchema);
