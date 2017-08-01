const request = require('request') ;

module.exports.getWeather = function(lat,long,callback) {
    
    request(
    `https://api.darksky.net/forecast/e484648b80398a8f77b0afb5091a9447/${lat},${long}?units=si`,function(error,response,body)
    {   
            
         callback(body) ;
    }) ;
    
    
}

module.exports.getLocation = function(address,callback) {
    if(address !== null && address !== undefined && address.trim() !== '') {
    request(
    'https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(address),function(error,response,body) {
        var parsedBody = JSON.parse(body) ;
        if(parsedBody.status.toLowerCase() === 'ok' ) {
        callback(
            {   successFlag:1,
                data:{
                    formattedAddress:parsedBody.results[0].formatted_address,
                    latitude:parsedBody.results[0].geometry.location.lat,
                    longitude:parsedBody.results[0].geometry.location.lng
                     }
            }
        ) ;
        }else{
            callback({successFlag : 0,
                      data:'Could not connect to location service!'})
        }
    }
    )
    }else{
        callback({successFlag : 0,
                      data:'Invalid Input!'}) ;
    }
}

return module.exports ;