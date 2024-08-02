import TenderModel from "../models/tender.models.js";

export const addTenderController = async (req, res) => {
  try {
    const {
      tenderName,
      tenderDescription,
      tenderStartTime,
      tenderEndTime,
      bufferTime,
    } = req.body;

    if (
      !tenderName ||
      !tenderDescription ||
      !tenderStartTime ||
      !tenderEndTime ||
      !bufferTime
    ) {
      return res
        .status(404)
        .json({ success: false, message: "all fields are required!" });
    }
    const newTender = new TenderModel({ ...req.body });
    await newTender.save();
    res
      .status(201)
      .json({ success: true, message: "tender created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
