import mongoose from 'mongoose';

const tableDataSchema = new mongoose.Schema({
  time: { type: String, required: true },
  location: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  alarm: { type: Boolean},
  is_active: {type: Boolean},
  is_deleted: {type: Boolean},
  created_at: {type: Number},
  updated_at: {type: Number},
});
module.exports = mongoose.models.TableData || mongoose.model("TableData", tableDataSchema);
