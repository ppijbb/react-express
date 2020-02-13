import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import router from '../routes/account';

const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now }
});

router.post('/signup',(req,res)=>{
    let usernameRegex = /^[a-z0-9]+$/;
    if(!usernameRegex.test(req.body.username)){
        return res.status(400).json({
            error:'Bad username',
            code : 1
        });
    if(req.body.password.length <4 || typeof req.body.password !== 'string'){
        return res.status(400).json({
            error: 'Bad Password',
            code:2
            });
        }
    }

    Account.findOne({ username: req.body.username},(err,exists)=>{
        if(err) throw errr;
        if(exists){
                return res.status(409).json({
                    error:"username exists",
                    code:3
                });
        }
        let account = new Account({
            username:req.body.username,
            password:req.body.password
        });
        account.password = account.generateHash(account.password);

        account.save(err=>{
            if(err) throw err;
            return res.json({ success: true});
        })
    })
});

router.post('/signin',(req,res)=>{
    if(typeof req.body.password !== "string"){
        return res.status(401).json({
            error: "Login Error",
            code:1
        });
    }

    Account.findOne({username : req.body.username}, (err,account) =>{
        if(err) throw err;

        if(!account){
            return res.status(401).json({
                error:"Login failed",
                
            })
        }

    })
})

// generates hash
Account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password
Account.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('account', Account);
