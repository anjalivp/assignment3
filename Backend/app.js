const express = require('express');
const BookData = require('./src/model/Bookdata');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var bodyparser=require('body-parser');
const User = require('./src/model/user');
const path = require('path');
const port = process.env.PORT || 8080;
var app = new express();
app.use(cors());
app.use(bodyparser.json());
app.use(express.static('./dist/Frontend'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'))
 });




app.get('/api/',(req,res)=>
{
  res.send("Hello from server");
})


app.post('/api/login', (req,res) => {
  let userData = req.body
 
  User.findOne({email: userData.email}, (error, user)=>{
    if(error) {
      console.log("Error")
    } else {
      if(!user){
        res.status(401).send('Invalid email')
      }else
      if(user.password!= userData.password){
        res.status(401).send('Invalid Password')
      }else{
        let payload = { subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
     
    }
  })
})

app.post('/api/signup', (req,res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((error, registeredUser) =>{
    if(error) {
      console.log("Error")
    } else {
      let payload = { subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})


app.get('/api/books',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS");
    
    BookData.find()
                .then(function(books){
                    res.send(books);
                });
});

app.get('/api/:id',(req,res) =>{
  const id=req.params.id;
  BookData.findOne({"_id":id})
  .then((book) => {
    res.send(book);
  });
})


app.get('/api/:id',(req,res) =>{
  const id=req.params.id;
  UserData.findOne({"_id":id})
  .then((user) => {
    res.send(user);
  });
})


app.put('/api/update',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    book= req.body.book,
    author = req.body.author,
    genre = req.body.genre,
    imageUrl = req.body.imageUrl
   BookData.findByIdAndUpdate({"_id":id},
                                {$set:{
                                "book":book,
                                "author":author,
                                "genre":genre,
                                "imageUrl":imageUrl}})
   .then(function(){
       res.send();
   })
 })
 
app.delete('/api/remove/:id',(req,res)=>{
 
   id = req.params.id;
   BookData.findByIdAndDelete({"_id":id})
   .then(()=>{
       console.log('Delete Successful')
              res.send();
   })
 })

 app.post('/api/insert',function(req,res){
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS");
  console.log(req.body);
  var book={
    book:req.body.book.book,
    author:req.body.book.author,
    genre:req.body.book.genre,
    imageUrl:req.body.book.imageUrl,
  }
  var book=new BookData(book);
  book.save();

});

   

// app.listen(port, function(){
//   console.log('listening to port');
// });


app.listen(process.env.PORT || port)