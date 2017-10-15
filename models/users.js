let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');
let crypto = require('crypto');
let Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

//The user schema attribute/characteristics/fields

let UserSchema = new Schema({
    email : {type : String, unique : true, lowercase : true},
    password : String,

    profile : {
        name : {type : String, default: ""},
        picture: {type : String, default: ""},
        occupation: {type : String, default: ""},
        age: Number,
        bio: {type : String, default: ""},
        picture: {type : String, default: ""}
    },
    liked : [{type : Schema.Types.ObjectId}]
});

//Hashing the password before saving into the database

UserSchema.pre('save', function (next) {
   let user = this;
   if(!user.isModified('password')) return next();
   bcrypt.genSalt(10, function (err, salt) {
       if(err) return next(err);
       bcrypt.hash(user.password, salt, null, function (err, hash) {
           if(err) return next(err);
           user.password = hash;
           next();
       });
   });
});

UserSchema.methods.gravatar = function (size) {
    if(!this.size) size=200;
    if(!this.email) return 'https://gravatar.com/avatar/?s='+size+'&d=wavatar';
    let md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/'+md5+'?s='+size+'&d=wavatar';
}

//Comparing password with the hash stored in DB

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User',UserSchema);