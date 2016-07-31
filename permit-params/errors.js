module.exports. = function OptionError(message) {

   Error.captureStackTrace(this);
   this.name = "OptionWrongError";
   this.message = message || "Option is wrong";
};

module.exports = function TypeError(message) {

   Error.captureStackTrace(this);
   this.name = "TypeError";
   this.message = message || "Type is wrong";
};
