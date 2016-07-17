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

const TYPEARR = ["number","array","object","null","function","undefined","boolean"];
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
  if(typeOf(obj) != TYPE.OBJECT || !(typeOf(req) == TYPE.OBJECT || typeOf(req) == TYPE.ARRAY)){

  //this version array only
  // if(typeOf(obj) != TYPE.OBJECT || !(typeOf(req) == TYPE.ARRAY)){

    return false;
  }

  //deep copy
  var target = Object.assign({},obj);

  //make guide
  //case array;
  if(typeOf(req) == TYPE.ARRAY){

    for(var i = 0;i<req.length;i++){
      delete target[req[i]]
    }

  }

  //case object
  else{
    var guide = {};
    var guide_keys

    guide_keys = Object.keys(req);

    // for(var i = 0;i<guide_keys.length;i++){
    //   if(req[guide_keys[i]] && req[guide_keys[i]]["type"] && TYPEARR.indexOf(req[guide_keys[i]]) != -1){
    //     guide[guide_keys] =
    //   }
    //   else{
    //     guide[guide_keys] = {
    //       type : "ignore"
    //     }
    //   }
    //
    // }//end for

    for(var i = 0; i<guide_keys.length;i++){

      //있어야한다. 없으면 끝
      var key = guide_keys[i]
      if(target[key]){

        //숫자일 경우 숫자로 컨버팅
        var targetType = typeOf(target[key])
        var reqType = req[key]

        if(reqType == TYPE.NUMBER && !isNaN(parseInt(target[key]))){
          target[key] = parseInt(target[key])
        }


        if(targetType == req[key]){
          delete target[key];
        }
        else{
          break;
        }
      }
      else{
        break;
      }//end if
    }
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
