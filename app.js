"use strict";

const TYPE = {
  NUMBER      : "number",
  ARRAY       : "array",
  OBJECT      : "object",
  NULL        : "null",
  FUNCTION    : "function",
  UNDEFINED   : "undefined",
  STRING      : "string",
  BOOLEAN     : "boolean"
}
// null           ->  Null
// []             ->  Array
// {}             ->  Object
// 1              ->  Number
// "1"            ->  String
// "!"            ->  String
// undefined      ->  Undefined
// function(){}   ->  Funtion
var typeOf = function(object){
  return Object.prototype.toString.call(object).replace("[", "").replace("]", "").replace("object ", "").toLowerCase();
}


var permit = function(obj,req){

  //obj must be Object && com must be
  // if(typeOf(obj) != TYPE.OBJECT || !(typeOf(req) == TYPE.OBJECT || typeOf(req) == TYPE.ARRAY)){

  //this version array only
  if(typeOf(obj) != TYPE.OBJECT || !(typeOf(req) == TYPE.ARRAY)){
    return false;
  }

  //deep copy
  var target = Object.assign({},obj);
  var req = req.concat([],req);

  for(var i = 0;i<req.length;i++){
    delete target[req[i]]
  }

  if(Object.keys(target).length){
    return false;
  }
  else{
    return true;
  }

}


exports = module.exports = permit;
exports.typeOf = typeOf;
