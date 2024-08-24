import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) =>{
  let error ={
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error"
  }
  if(err.name === "CastError"){
    const message = `Resource Not Found. Invalid: ${err?.path}`
    error = new ErrorHandler(message, 404);
  }
  if(err.name === "ValidationError"){
    const messages = Object.values(err.errors).map((value) => value.message);
    const uniqueMessages = [...new Set(messages)]; // Remove duplicates
    const message = uniqueMessages.join(", ");
    error = new ErrorHandler(message, 400)
  }
  if(err.name === "JsonWebTokenError"){
    const message = 'JSON Web Token is invalid. Try Again!!!'
    error = new ErrorHandler(message, 400);
  }
  if(err.name === "TokenExpiredError"){
    const message = 'JSON Web Token has expired. Try Again!!!'
    error = new ErrorHandler(message, 400);
  }
  if(process.env.NODE_ENV === "DEVELOPMENT"){
    res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack
    });
  }
  if(process.env.NODE_ENV === "PRODUCTION"){
    res.status(error.statusCode).json({
      message: error.message
    });
  }
}