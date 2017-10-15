let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let StoriesSchema = new Schema({
    author : {type : Schema.Types.ObjectId, ref:'User'},
    text : {type: String , default : ""},
    happiness : {type : Number, max: 50 , min : -50},
    likes : {type : Number, default: 0},
    created_at : String
});

module.exports = mongoose.model('Stories',StoriesSchema);