const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
//define user schema
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    username:{
        type:String,
        trim:true,
        required:true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    // roles:{
    //     type:Object,
    //     trim:true,
    //     required:true
    // }
})
//hash user password before save user info in database
//middleware pre hook save
UserSchema.pre('save',function (next) {
    this.password=bcrypt.hashSync(this.password,saltRounds);
    next();
});
module.exports=mongoose.model('user',UserSchema);