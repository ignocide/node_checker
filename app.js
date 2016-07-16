"use strict";

// null           ->  Null
// []             ->  Array
// {}             ->  Object
// 1              ->  Number
// "1"            ->  String
// "!"            ->  String
// undefined      ->  Undefined
// function(){}   ->  Funtion
var typeOf = function(object){
    return Object.prototype.toString.call(object).replace("[", "").replace("]", "").replace("object ", "");
}

exports.typeOf = typeOf;
