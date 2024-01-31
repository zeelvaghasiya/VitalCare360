import mongoose from "mongoose";

const notificationSchema = new Schema(
  {
    UserType: {
      type: String,
      enum: ["Doctor", "Patient"],
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
    ReadStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model("Notification", notificationSchema);
