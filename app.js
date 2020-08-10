const express = require('express');  // install it first
const mysql = require('mysql');   // install it first
const path = require('path'); //no needto install
const dotenv = require('dotenv');  // install it first
const cookieParser = require('cookie-parser')
dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

const publicDirctory = path.join(__dirname, './public')// it is part of nodejs so we have to import it we dont install it its default
//console.log(__dirname);//it give curruent directory name
app.use(express.static(publicDirctory));

//parse URL-encoded bodies(as sent by html forms)
app.use(express.urlencoded({extended:false}));

//parse json bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());


app.set('view engine', 'hbs');//dependacy call hbs install first

db.connect((error) => {
    if (error) {
        console.log('error');
    }
    else {
        console.log('Connected to MySQL Server!');
    }

});
app.listen(process.env.PORT || 8080, process.env.ip, function () {
    console.log('Server is running!');
});

//app.listen('3000', ()=>{

//  console.log('server started');
//});
app.use('/', require('./routes/pages'));

app.use('/auth', require('./routes/auth'));

app.listen(3000, () => {

    console.log('server started');
});





/*const express = require('express');//running code use port 3000
const mysql = require('mysql');


const app=express();


app.get("/",(req,res)=>{
res.send("<h1>HOme</h1>")

})
app.listen('3000', ()=>{

    console.log('server started');
});*/


