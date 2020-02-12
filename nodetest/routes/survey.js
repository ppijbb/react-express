const express = require('express');
const db = require('../testdb');
const session = require('express-session');
const sqlstore = require('express-mysql-session');

const router = express.Router();

router.get('/',(req,res) =>{
	res.render('survey.ejs');
});
router.get('/2',(req,res) =>{
	res.render('survey2.ejs');
});


router.post('/',function(req,res){
	var	one = 1*req.body.one,
		two = 1*req.body.two,
		thr = 1*req.body.thr,
		fou = 1*req.body.fou,
		fiv = 1*req.body.fiv,
		six = 1*req.body.six;
	var values = [one,two,thr,fou,fiv,six];
	db((err,connection)=>{

	connection.query("INSERT INTO test VALUES (?)",[values],function(err,results){
		if(err)
			console.log(err);
		else
			console.log('input clear'); 
		});
	db((err,connection)=>{
                connection.query("SELECT *FROM test", (err,rows)=>{
                        connection.release();
                        if(err){
                                 throw err;
                              }
                      return res.json({data:rows});
                      		});
		});

	});
});

module.exports = router;
