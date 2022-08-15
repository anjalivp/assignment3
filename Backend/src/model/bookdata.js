const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anjalivp92:astrosat@cluster0.hl0trq4.mongodb.net/LibraryDB?retryWrites=true&w=majority')
.then(() => {
    console.log("mongodb connected");
});
const Schema = mongoose.Schema

var NewBookSchema = new Schema({
    book: {type: String},
    author: {type: String},
    genre: {type: String},
    imageUrl: {type:String}
});

var Bookdata = mongoose.model('book',NewBookSchema);


module.exports = Bookdata;