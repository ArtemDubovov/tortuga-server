export class ApiError extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest (message, errors) {
    return new ApiError(400, message, errors);
  }
  
  static Unauthorization (message, errors) {
    return new ApiError(401, message, errors);
  }

  static BadEmail (message, errors) {
    return new ApiError(401, message, errors);
  }
}