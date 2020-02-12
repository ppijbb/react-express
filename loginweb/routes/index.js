var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET home page. */

models.sequelize.sync()
  .then(()=>{
      console.log('DB connected');
  })
  .catch(err =>{
      console.error(err);
      console.log('DB Connection fail');
  })

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/process/login',async function(req,res,next){
  let bodyid = req.body.id;
  let bodypw = req.body.password;
  let result = await models.Users.findOne({where:{userID : bodyid}})
  if(result != undefined){
      if(result.dataValues.userPW == bodypw){
        console.log('login ' + bodyid);
        res.redirect('/users');
         }
      else{
            console.log(bodyid + ' wrong password');
            res.send("<script>alert('wrong password.')</script><meta http-equiv='refresh' content='0; url=/'</meta>");
   }
  }
   else{
     console.log('wrong id');
     res.send("<script>alert('wrong id.')</script><meta http-equiv='refresh' content='0; url=/'</meta>");
   }

});

module.exports = router;
