var express = require('express');
var router = express.Router();
const {saveUser,loadUsers} =require('../utils/usersOperatioms')

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(loadUsers({}))  
});

router.post('/add',  urlencodedParser, 
  function (req,res) {
    console.log(req.body)
    saveUser({name:req.body.name,age:req.body.age})
  }
)
module.exports = router;
