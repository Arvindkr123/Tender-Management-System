// models/Tender.js
import mongoose, { Schema } from "mongoose";

const tenderSchema = new Schema(
  {
    tenderName: {
      type: String,
      required: true,
      minlength: 3,
    },
    tenderDescription: {
      type: String,
      required: true,
      minlength: 20,
    },
    tenderStartTime: {
      type: Date,
      required: true,
    },
    tenderEndTime: {
      type: Date,
      required: true,
    },
    bufferTime: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const TenderModel = mongoose.model("Tender", tenderSchema);

export default TenderModel;
