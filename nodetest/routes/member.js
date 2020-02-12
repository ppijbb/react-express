const express = require("express");
const db = require("../testdb");

const router = express.Router();

router.get("/",(req,res) =>{
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

module.exports = router;
		
