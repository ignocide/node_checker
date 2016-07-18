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
const GUIDEOPTIONS = {
  type : null,
  toNumber : true,
  // func : null,
  allowValueNull : false,
  allowKeyNull : false
}


const GUIDEKEYS = Object.keys(GUIDEOPTIONS);
var typeOf = function(object){
  return Object.prototype.toString.call(object).replace("[", "").replace("]", "").replace("object ", "").toLowerCase();
}


var permit = function(obj,req){

  //obj must be Object && com must be
  if(typeOf(obj) != TYPE.OBJECT || !(typeOf(req) == TYPE.OBJECT || typeOf(req) == TYPE.ARRAY)){
    return false;
  }

  let reqType = typeOf(req);

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

            //todo : make condition object and make dynamic comapre
            if(reqOptKey == "type" && !(TYPEARR.indexOf(reqOptValueType) > 0 || reqOptValueType == null)){
              return false;
            }
            else if(reqOptKey == "toNumber" && reqOptValueType != TYPE.BOOLEAN){
              return false;
            }
            // else if(reqOptKey == "func" && reqOptValueType != TYPE.FUNCTION){
            //   return false;
            // }
            else if(reqOptKey == "allowValueNull" && reqOptValueType != TYPE.BOOLEAN){
              return false;
            }
            else if(reqOptKey == "allowKeyNull" && reqOptValueType != TYPE.BOOLEAN){
              return false;
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


exports = module.exports = permit;
exports.typeOf = typeOf;
