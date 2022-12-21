const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); 

let app = express(); // to use express

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mongoDB urls 
const dbUrl = 'mongodb://127.0.0.1:27017/Assesments';
 
// port number where server runs 
const PORT = 3000;


app.listen(PORT,() => {
    console.log("Application Started on Port " + PORT)
})


// connect nodejs to mongodb 
mongoose.set("strictQuery", false);
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))

// user route to navigate urls 
app.use('/api', require('./route/api.js')); 