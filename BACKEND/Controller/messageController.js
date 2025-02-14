import { Message } from "../Models/messageSchema.js";
import {catchAsyncErrors} from "../Middlewares/catchAsyncErrors.js"
import ErrorHandler from "../Middlewares/errorMiddleware.js";


export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please fill the full form", 400));
  }

  await Message.create({ firstName, lastName, email, phone, message });

  return res.status(200).json({
    success: true,
    msg: "Message send successfully",
  });
});


export const getAllMessages= catchAsyncErrors(async (req,res,next) => {
    const messages= await Message.find()

    res.status(200).json({
      success: true,
      messages
    })
})