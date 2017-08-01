const express = require('express') ;
const fs = require('fs') ;
const hbs = require('hbs') ;
const port_num = process.env.PORT || 8000 ;
const reqUtility = require('./requestUtility.js') ;
var app = express() ;
var responseData = {key:'unchanged'} ;
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

app.get('/getWeatherByLatLong',function(request,response) {
    var latitude = 18.5179431 ;
var longitude = 73.90666329999999 ;
        var result = reqUtility.getWeather(latitude,longitude,(result)=>
                                           {
            var obj = JSON.parse(result) ;
            console.log(obj.currently.temperature) ;
        }
        ) ;
        console.log(result) ;
        }) ;

app.get('/getWeather',function(request,response) {
    reqUtility.getLocation(request.query.address,function callback(result)
                           {
      if(result.successFlag === 1) {  reqUtility.getWeather(result.data.latitude,result.data.longitude,function callback(weatherData) {
          result.data.weather = JSON.parse(weatherData) ;
          response.send(result) ;    
        })
                                   }
        else{
            response.send(result) ;
        }
        
    }) ;
    
    
}) ;

var setData = function(data) {
    
    responseData = data ;
}


app.listen(port_num,function()
           {
    console.log('Server Started successfully!') ;
}) ;