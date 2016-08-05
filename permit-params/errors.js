module.exports.OptionError = function(message) {

   Error.captureStackTrace(this);
   this.constructor.name = "OptionWrongError";
   this.message = message || "Option is wrong";

};

module.exports.TypeError = function (message) {

   Error.captureStackTrace(this);
   this.constructor.name = "TypeError";
   this.message = message || "Type is wrong";
   this.items = {}
};

require('util').inherits(module.exports.OptionError, Error);

require('util').inherits(module.exports.TypeError, Error);
