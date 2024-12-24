import { catchAsyncErrors } from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/errorMiddleware.js";
import { User } from "../Models/userSchema.js";
import { generateJwtToken } from "../Utils/jwtToken.js";
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    aadharNo,
    dob,
    gender,
    role,
    password,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !aadharNo ||
    !dob ||
    !gender ||
    !role ||
    !password
  ) {
    return next(new ErrorHandler("Please fill the full form", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exist", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    aadharNo,
    dob,
    gender,
    role,
    password,
  });

  generateJwtToken(user, "User Registered", 200, res);
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  // Check if email and password are provided
  if (!email || !password || !confirmPassword) {
    return next(new ErrorHandler("Please provide all details", 400));
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password do not match!", 400)
    );
  }

  // Find the user by email
  const user = await User.findOne({ email }).select("+password"); // Include password field

  // Check if user exists
  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  // Compare the provided password with the stored password
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User with role not found", 400));
  }

  // Generate JWT
  generateJwtToken(user, "Logged In Successfully", 200, res);
});

export const adminRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, aadharNo, dob, gender, password } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !aadharNo ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please fill the full form", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin already exist", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    aadharNo,
    dob,
    gender,
    password,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    msg: "New Admin Registered",
  });
});

// GET ALL DOCTORS
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  // Find all users with the role "Doctor"
  const doctors = await User.find({ role: "Doctor" });

  // Check if any doctors exist
  if (!doctors || doctors.length === 0) {
    return next(new ErrorHandler("No doctors found", 404));
  }

  // Return the list of doctors
  res.status(200).json({
    success: true,
    doctors,
  });
});

//GET USER DETAILS
export const getUserDetail = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user,
  });
});

// ADMIN LOGOUT
export const adminLogout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      msg: "Admin Log-out Suuccessfully",
    });
});

// PATIENT LOGOUT
export const patientLogout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      msg: "Patient Log-out Suuccessfully",
    });
});

// DOCTOR REGISTRATION
export const doctorRegister = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }

  const { docAvatar } = req.files;
  const allowedFormates = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormates.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Formate not Supported", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    aadharNo,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !aadharNo ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please fill the full form", 400));
  }

  const isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already exist with this email`,
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error : ",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
    return next(new ErrorHandler("Cloudinary upload error", 500));
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    aadharNo,
    dob,
    gender,
    password,
    doctorDepartment,
    role:"Doctor",
    docAvatar:{
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url
    }
  });

    res.status(200).json({
      success:true,
      msg:"New Doctor Registered",
      doctor
    })
});
