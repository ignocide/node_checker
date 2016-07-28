"use strict";

//def data types
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

//memorizing data type valuse
const TYPEARR = ["string","number","array","object","null","function","undefined","boolean"];

//options guide
const GUIDEOPTIONS = {
  type : null,
  toNumber : true,
  allowValueNull : false,
  allowKeyNull :  false
  // func : null,
}

//options guide keys
const GUIDEKEYS = Object.keys(GUIDEOPTIONS);

//supply type in options guide
const GUIDEOPTIONSCONDITION = {
  type : [TYPE.NULL,TYPE.STRING],
  toNumber : [TYPE.BOOLEAN],
  allowValueNull : [TYPE.BOOLEAN],
  allowKeyNull : [TYPE.BOOLEAN]
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


//main function
var permit = function(obj,req){

  var reqType = typeOf(req);
  var objType = typeOf(obj);
  //obj must be Object && com must be
  if(objType != TYPE.OBJECT || !(reqType == TYPE.OBJECT || reqType == TYPE.ARRAY)){
    return false;
  }

  //copy of req
  let request = {};
  //use compare
  let guide = {};
  //use compare keys
  let guideKey = [];
  //request compares key
  let reqKeys = [];


  //array to object
  if(reqType == TYPE.ARRAY){
    request = {};
    for(var i = 0;i<req.length;i++){
      request[req[i]] = { type : null };
    }
    reqType = TYPE.OBJECT;
  }
  else if(reqType == TYPE.OBJECT){
    request = Object.assign(req);
  }

  if(reqType == TYPE.OBJECT){
      reqKeys = Object.keys(request);


      //use because "break"
      for(var i =0;i<reqKeys.length;i++){
      // reqKey.forEach(function(key){
        let key = reqKeys[i];

        guide[key] = Object.assign({},GUIDEOPTIONS);
        // guide[key] = TYPEARR.indexOf(req[type] != -1) ? req[type] : null
        let reqItemOpt = request[key];
        if(typeOf(reqItemOpt) == TYPE.STRING){
          if(TYPEARR.indexOf(reqItemOpt) != -1){
            guide[key]["type"] = reqItemOpt
          }
          else{
            return false;
          }
        }


        else if(typeOf(reqItemOpt) == TYPE.OBJECT){
          let reqOptKeys = Object.keys(reqItemOpt);
          for(var j=0;j<reqOptKeys.length;j++){
            let reqOptKey = reqOptKeys[i];
            let reqOptValue = reqItemOpt[reqOptKey];
            let reqOptValueType = typeOf(reqOptValue);

            if(GUIDEKEYS.indexOf(reqOptKey) < 0 || GUIDEOPTIONSCONDITION[reqOptKey].indexOf(typeOf(reqItemOpt[reqOptKey])) < 0 ){
              console.log("!!")
            }
            else{
              guide[key][reqOptKey] = reqItemOpt[reqOptKey];
            }
          }
        }
        else{
          return false;
        }
      }

  }

  //deep copy
  let target = Object.assign({},obj);
  let guideKeys = Object.keys(guide);


  //compare!
  for(var i = 0; i<guideKeys.length;i++){

    //있어야한다. 없으면 끝
    var key = guideKeys[i];
    var guideOpt = guide[key];
    if(target[key]){
      //숫자일 경우 숫자로 컨버팅
      var targetType = typeOf(target[key])
      let guideType = guideOpt['type']


      if(guideType == TYPE.NUMBER && !isNaN(parseInt(target[key]))){
        target[key] = parseInt(target[key]);

        if(guideOpt.toNumber){
          obj[key] = parseInt(obj[key]);
        }
      }


      let pass = true;
      if(targetType == guideType || guideType == null){
      }
      else if(guideOpt.allowValueNull){
      }
      else{
        break;
      }

      if(pass){
        delete target[key];
      }
    }
    else if(guideOpt.allowKeyNull){
    }
    else{
      break;
    }//end if
  }

  if(Object.keys(target).length){
    return false;
  }
  else{
    return true;
  }

}



var asModule = function(opt){
  var data = {};
  var opt = opt || {};
  return function(req,res,next){
    if(req.method == "GET"){
      data = Object.assign(req.params,req.query) ;
    }
    else{
      data = req.body;
    }
    var result = permit(data,opt);

    if(result){
      next();
    }
    else{
      next(new Error("parameter is not permit"));
    }
  };
}


exports = module.exports = permit;
exports.typeOf = typeOf;
exports.asModule = asModule;
