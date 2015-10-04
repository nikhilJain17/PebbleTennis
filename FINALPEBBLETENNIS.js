/**
 * Hey
 */

var ajax = require('ajax');
var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');

var sumx = 0;
var sumy = 0;
var sumz = 0;
var counter = 0;

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Pebble Tennis',
  body: 'Enjoy.'
});

main.show();



var mallu = function() {
     
     
     
     Accel.on('data', function(e) {
          
          Accel.config(25, 1, true);
          
          var x = e.accel.x;
          var y = e.accel.y;
          var z = e.accel.z;

          sumx += x;
          sumy += y;
          sumz += z;
          
          counter++;
          
          var averagex = sumx / counter;
          var averagey = sumy / counter;
          var averagez = sumz / counter;
          
          if (counter == 10) {
               
               console.log("\n\nRESETTING AND SENDING\n\n");
          
               // send the goods
               var packet = {
                    x:averagex,
                    y:averagey,
                    z:averagez
               };
               
               // emit the goods
               ajax(
             {
               url: 'http://7ad27d1d.ngrok.io/coordinates',
               method: 'post',
               type: 'json',
               data: packet,
               crossDomain: true
             });
               
               // reset the mallus
               counter = 1;
               
               sumx = x;
               sumy = y;
               sumz = z;
               
               averagex = sumx;
               averagey = sumy;
               averagez = sumz;
          
          }
               
          console.log("\n\n\nAverages: " + averagex + " " + averagey + " " + averagez);
          console.log('Just received ' +  x + ',' + y + ','  + z + ' from the accelerometer.');
          
     });
     
};




var accel2 = function() {
     Accel.init();
     
     console.log("accel2 is called");
     
     setInterval(mallu, 20000);
     
     
     
     
};


accel2();


