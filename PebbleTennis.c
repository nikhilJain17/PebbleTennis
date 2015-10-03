// downloads the datum, sends it to the c file


// for getting openweatherdata
var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
};

// for sending post requests to the server
var mPostRequest = function (url, type) {
     var req = new XMLHttpRequest();
     req.open(type, url);
     
     var JSONObj = { name:"nadgir", price: 542000 };

     req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
     req.send('nadgir=billa');
}

// http://7ad27d1d.ngrok.io/

function locationSuccess(pos) {
     
     // POST some cheese to the server
     var url = "http://7ad27d1d.ngrok.io/coordinates";
     mPostRequest(url, 'POST');
     
     
     
  // We will request the weather here
     // construct url
var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
      pos.coords.latitude + '&lon=' + pos.coords.longitude;//      
     
     // send request
     xhrRequest(url, 'GET', 
               function(responseText) {
                    // responseText contains a json object with weather info
                    var json = JSON.parse(responseText);
                    
                    // temp in kelvin requires adjustment
                    var temperature = Math.round(json.main.temp - 273.15);
                    console.log('Temperature is ' + temperature);
                    
                    // conditions
                    var conditions = json.weather[0].main;
                    console.log('Conditions are ' + conditions);
                    
               });
     
     // Assemble dictionary using our keys
     var dictionary = {
          'KEY_TEMPERATURE': temperature,
          'KEY_CONDITIONS': conditions
     };

     // Send to Pebble
     Pebble.sendAppMessage(dictionary,
                           function(e) {
                                console.log('Weather info sent to Pebble successfully!');
                           },
                           function(e) {
                                console.log('Error sending weather info to Pebble!');
                           }
                          );
     
          // Listen for when an AppMessage is received
     Pebble.addEventListener('appmessage',
       function(e) {
         console.log('AppMessage received!');
         getWeather();
       }                     
     );
     
}


function locationError(err) {
  console.log('Error requesting location!');
}

function getWeather() {
  navigator.geolocation.getCurrentPosition(
    locationSuccess,
    locationError,
    {timeout: 15000, maximumAge: 60000}
  );
}



// Listen for when the watchface is opened
Pebble.addEventListener('ready', 
  function(e) {
    console.log('\n\nPebbleKit JS ready!\n\n');
       
     // get initial weather
     getWeather();
  }
);


// Listen for when an AppMessage is received
Pebble.addEventListener('appmessage',
  function(e) {
    console.log('AppMessage received!');
  }                     
);