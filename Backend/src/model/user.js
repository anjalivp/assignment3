const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://anjalivp92:astrosat@cluster0.hl0trq4.mongodb.net/LibraryDB?retryWrites=true&w=majority')
.then(() => {
    console.log("mongodb connected");
});
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String},
    password: {type: String}
});

// var Userdata=mongoose.model('user', NewUserSchema)
module.exports = mongoose.model('user', userSchema, 'users');