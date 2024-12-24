import { catchAsyncErrors } from "../Middlewares/catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../Middlewares/errorMiddleware.js";
import { User } from "../Models/userSchema.js";


// ADMIN AUTHENTICATION
const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Check if token is present in cookies
  const { adminToken } = req.cookies;

  if (!adminToken) {
    return next(
      new ErrorHandler("Please login as admin to access this resource", 401)
    );
  }

  // Verify the token
  const decodedData = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);

  // Find the admin user
  const user = await User.findById(decodedData.id);

  if (!user || user.role !== "Admin") {
    return next(
      new ErrorHandler("Unauthorized access, admin credentials required", 403)
    );
  }

  // Attach user to request and proceed
  req.user = user;
  next();
});



// PATIENT AUTHENTICATION
const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Check if token is present in cookies
  const { patientToken } = req.cookies;

  if (!patientToken) {
    return next(
      new ErrorHandler("Please login as patient to access this resource", 401)
    );
  }

  // Verify the token
  const decodedData = jwt.verify(patientToken, process.env.JWT_SECRET_KEY);

  // Find the patient user
  const user = await User.findById(decodedData.id);

  if (!user || user.role !== "Patient") {
    return next(
      new ErrorHandler("Unauthorized access, patient credentials required", 403)
    );
  }

  // Attach user to request and proceed
  req.user = user;
  next();
});

export { isAdminAuthenticated, isPatientAuthenticated };
