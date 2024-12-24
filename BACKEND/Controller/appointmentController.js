import { Appointment } from "../Models/appointmentSchema.js";
import { User } from "../Models/userSchema.js";
import ErrorHandler from "../Middlewares/errorMiddleware.js";
import { catchAsyncErrors } from "../Middlewares/catchAsyncErrors.js";

export const createAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    aadharNo,
    dob,
    gender,
    appointmentDate,
    department,
    doctor_firstName,
    doctor_lastName,
    address,
  } = req.body;

  // Check if all required fields are provided
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !aadharNo ||
    !dob ||
    !gender ||
    !appointmentDate ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please fill in all required fields", 400));
  }

  // Find a doctor that matches the given information and department
  const doctor = await User.findOne({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (!doctor) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  // Check if multiple doctors were returned
  const doctorCount = await User.countDocuments({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (doctorCount > 1) {
    return next(
      new ErrorHandler("Multiple doctors found; please contact support.", 409)
    );
  }

  const doctorId = doctor._id;
  const patientId = req.user._id;

  // Create the appointment
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    aadharNo,
    dob,
    gender,
    appointmentDate,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    doctorId,
    patientId,
    address,
    status: "Pending", // default status
  });

  res.status(201).json({
    success: true,
    message: "Appointment successfully created",
    appointment,
  });
});



export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();

  if (!appointments) {
    return next(new ErrorHandler("No appointments found", 404));
  }

  res.status(200).json({
    success: true,
    appointments,
  });
});


export const updateAppointment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // Appointment ID from URL parameters
    const updateData = req.body; // Fields to update
  
    // Find the appointment by ID and update it with the provided data
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateData, {
      new: true, // Returns the updated document
      runValidators: true, // Validates the fields according to the schema
    });
  
    // Check if the appointment exists
    if (!updatedAppointment) {
      return next(new ErrorHandler("Appointment not found", 404));
    }
  
    res.status(200).json({
      success: true,
      message: "Appointment successfully updated",
      updatedAppointment,
    });
  });


  export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // Appointment ID from URL parameters
  
    // Find the appointment by ID and delete it
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
  
    // Check if the appointment exists
    if (!deletedAppointment) {
      return next(new ErrorHandler("Appointment not found", 404));
    }
  
    res.status(200).json({
      success: true,
      message: "Appointment successfully deleted",
    });
  });