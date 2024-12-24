import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain at least 3 characters."],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must contain at least 3 characters."],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain exactly 10 digits."],
    maxLength: [10, "Phone number must contain exactly 10 digits."],
  },
  aadharNo: {
    type: String,
    required: [true, "Aadhar number is required."],
    minLength: [12, "Aadhar must contain exactly 12 digits."],
    maxLength: [12, "Aadhar must contain exactly 12 digits."],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required."],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
