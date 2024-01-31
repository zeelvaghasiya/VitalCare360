import mongoose, { Schema } from "mongoose";


const reviewSchema = new Schema(
    {
      patientRef: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
      },
      doctorRef: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
      },
      Rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      ReviewText: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );
  

export const Review = mongoose.model("Review", reviewSchema);
