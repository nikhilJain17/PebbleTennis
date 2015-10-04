/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var ajax = require('ajax');
var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');

var sumx = 0;
var sumy = 0;
var sumz = 0;
var counter = 0;

var initialx = 0;
var initialy = 0;
var initialz = 0;

var finalx = 0;
var finaly = 0;
var finalz = 0;

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
          
          // from 1-4, get initial values
          if (counter < 5) {
               initialx += x;
               initialx = initialx / counter;
               
               initialy += y;
               initialy = initialy / counter;
               
               initialz += z;
               initialz = initialz / counter;
          }
          
          // from 14 to 19, get final values
          if (counter >= 14 && counter <= 19) {
               finalx += x;
               finalx = finalx / counter;
               
               finaly += y;
               finaly = finaly / counter;
               
               finalz += z;
               finalz = finalz / counter;
          }
          
          var averagex = sumx / counter;
          var averagey = sumy / counter;
          var averagez = sumz / counter;
          
          if (counter == 20) {
               
               console.log("\n\nRESETTING AND SENDING THE ANALYSIS\n\n");
          
               var isTopspin;
               
               // topspin or slice? (for forehand)
               var deltax = finalx - initialx;
               var deltay = finaly - initialy;
               if (deltay > 0 && deltax < 0) {
                    // topspin
                    isTopspin = true;
                    console.log("\nTOPSPIN\n");
//                     post
                    
                    var topspin = {topspin: "true"};
                     ajax(
                  {
                    url: 'http://7ad27d1d.ngrok.io/topspin',
                    method: 'post',
                    type: 'json',
                    data: topspin,
                    crossDomain: true
                  });
                    
                    
               }
               else if (deltax < 0 && deltay < 50){
                    isTopspin = false;
                    console.log("\nSLICE\n");
                    
                    var slice = {slice: "true"};                    
//                     post
                     ajax(
                  {
                    url: 'http://7ad27d1d.ngrok.io/slice',
                    method: 'post',
                    type: 'json',
                    data: slice,
                    crossDomain: true
                  });
                    
                    
               }
               
               else {
                    console.log("\nNEITHER\n");
               }
               
               
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
               
//           console.log("\n\n\nAverages: " + averagex + " " + averagey + " " + averagez);
//           console.log('Just received ' +  x + ',' + y + ','  + z + ' from the accelerometer.');
          
     });
     
};




var accel2 = function() {
     Accel.init();
     
     console.log("accel2 is called");
     
     setInterval(mallu, 20000);
     
     
     
     
};


accel2();


