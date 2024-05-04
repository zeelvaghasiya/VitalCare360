import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const doctorSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    avatar: {
      type: String, // cloudinary url or file storage reference
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    personalInfo: {
      type: String,
      default: "I am a Doctor",
    },
    speciality: {
      type: String,
      required: true,
      enum: [
        "GeneralPhysician",
        "SkinAndHair",
        "WomenHealth",
        "DentalCare",
        "ChildSpecialist",
        "Physiotherapist",
        "EyeSpecialist",
        "Heart",
      ],
    },
    eduQualification: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    address: {
      type: String,
      required: true,
    },
    clinicDetails: [
      {
        type: String,
      },
    ],
    timeSlots: [
      {
        dayOfWeek: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          required: true,
        },
        startTime: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          default: "Available",
          enum: ["Available", "Booked", "Unavailable"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

doctorSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

doctorSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

doctorSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Doctor = mongoose.model("Doctor", doctorSchema);
1;
