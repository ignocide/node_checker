var express = require('express');
var router = express.Router();
var checker = require("../../app");

var option = {
  a : "string"
}
var checker_module = checker.asModule(option);

router.get('/', checker_module,function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
