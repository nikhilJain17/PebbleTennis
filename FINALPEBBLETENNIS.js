/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var ajax = require('ajax');
var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');


var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Pebble Tennis',
  body: 'Enjoy.'
});

main.show();

var connect = function() {
     
     console.log("Connecting");
     
      var JSONObj = { name:"nadgir", price: 1 };

     ajax(
        {
          url: 'http://7ad27d1d.ngrok.io/coordinates',
          method: 'post',
          type: 'json',
          data: JSONObj,
          crossDomain: true
        });
};

var accel = function() {
     
     Accel.init();
     
     for (var i = 0; i < 100; i++) {
          
          setInterval(accel, 1000);
          
          Accel.peek(function(e) {
               var x = e.accel.x;
               var y = e.accel.y;
               var z = e.accel.z;
               console.log('Current acceleration on axis are: X=' + x + ',' + y + ','  + z + ' Y=' + e.accel.y + ' Z=' + e.accel.z);
          });
     }
          
};

var accel2 = function() {
     Accel.init();
     Accel.config(25, 10, true);
     
     
     
     Accel.on('data', function(e) {
          
          var x = e.accel.x;
          var y = e.accel.y;
          var z = e.accel.z;

          var packet = {
               x:x,
               y:y,
               z:z
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
          
          console.log('Just received ' +  x + ',' + y + ','  + z + ' from the accelerometer.');
          
     });
     
};

connect();
accel2();
// accel();

// main.on('click', 'up', function(e) {
//   var menu = new UI.Menu({
//     sections: [{
//       items: [{
//         title: 'Pebble.js',
//         icon: 'images/menu_icon.png',
//         subtitle: 'Can do Menus'
//       }, {
//         title: 'Second Item',
//         subtitle: 'Subtitle Text'
//       }]
//     }]
//   });
//   menu.on('select', function(e) {
//     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
//     console.log('The item is titled "' + e.item.title + '"');
//   });
//   menu.show();
// });

// main.on('click', 'select', function(e) {
//   var wind = new UI.Window({
//     fullscreen: true,
//   });
//   var textfield = new UI.Text({
//     position: new Vector2(0, 65),
//     size: new Vector2(144, 30),
//     font: 'gothic-24-bold',
//     text: 'Text Anywhere!',
//     textAlign: 'center'
//   });
//   wind.add(textfield);
//   wind.show();
// });

// main.on('click', 'down', function(e) {
//   var card = new UI.Card();
//   card.title('A Card');
//   card.subtitle('Is a Window');
//   card.body('The simplest window type in Pebble.js.');
//   card.show();
// });

