class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handling MongoDB Duplicate Key Error (E11000)
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Extended`;
    err = new ErrorHandler(message, 400);
  }

  // Handling JWT Errors
  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is Invalid, Try Again!";
    err = new ErrorHandler(message, 400);
  }

  // Handling Expired JWT Token Error
  if (err.name === "TokenExpiredError") {
    const message = "Json Web Token is Expired, Try Again!";
    err = new ErrorHandler(message, 400);
  }

  // Handling Mongoose CastError
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  // Sending response with status code and error message
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
