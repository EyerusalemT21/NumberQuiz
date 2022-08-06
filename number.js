var express = require('express');
var app = express();
var path = require('path');
var sessions = require('express-session');

var questions = require('./data.js');

const ques = questions.questions;
const ans = questions.answers;

app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({extended:false}));

app.set("view engine","pug");

var count = 0;
var score = 0;
var session;

app.use(sessions({
    secret: "Salt for cookie signing",
    saveUninitialized: true,
    resave: false
}));

app.get('/', (req,res)=>{
    session = req.session;
    if(session.count || session.score){
        count = session.count;
        score = session.score;
    }
    res.render('index',{question:ques[count],score});
})

app.post('/',(req,res)=>{
    if(count != 4){
        if(ans[count] === parseInt(req.body.answer)){
            score++;
        }
        count++
        res.render('index',{question:ques[count],score})
    }else{
        if(ans[count] === parseInt(req.body.answer)){
            score++;
        }
        count = 0;
        res.render('score',{score})
        score = 0;
    }
})

//const PORT = 3000;
app.listen(3000);
