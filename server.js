const express = require('express') ;
const fs = require('fs') ;
const hbs = require('hbs') ;
const port_num = process.env.PORT || 8000 ;
var app = express() ;
app.set('view engine','hbs') ;
app.set('views',__dirname+'/webapp/html') ;
app.use(function(request,response,next) {
    var now = new Date().toString() ;
    fs.appendFile('server.log',`${now} Request with method ${request.method}` + '\n') ;
    next() ;
}) ;

app.get('/',function(request,response)
        {
    
    response.render('index',{title:'Weather App!',para:'Testing heroku'}) ;
}) ;

app.listen(port_num,function()
           {
    console.log('Server Started successfully!') ;
}) ;