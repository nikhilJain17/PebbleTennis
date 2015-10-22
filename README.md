# BDPebbleTennis


Made by Nikhil Jain and Rishi Masand.


Get realtime data and feedback on your Pebble and iOS device while playing tennis. We won 2nd Place Overall, Best Pebble Hack, Best SendGrid Hack, and Best Hardware Hack! In addition, we met Bjarne Stroustrop!


**Inspiration**
* Both of us are tennis players, and while playing tennis, we realized that we had no way to get data about our strokes. We wanted to create something that could solve this problem.


**What it does**
* The Pebble watch app reads accelerometer data from the racket, and analyzes it to determine what stroke the user hit. It then posts the data to a node server, which communicates with the iPhone app. The iPhone app displays how many forehands, backhands, topspin shots, and slice shots the user hit. It also allows the user to email the session's data to yourself and your coach for further analysis.


**How we built it**
* On the Pebble watch app side, we used Pebble.js to capture the accelerometer data. It uses the data to determine what shot the user hit, and then sends a post request using ajax to the Node.js server. The Node.js server receives the data and consumes the SendGrid API to send emails. It interacts with the iOS app through socket.io. The iOS app displays the data and allows the user to enter your email address and your coach's email address, and they receive emails through the Node server.


**Challenges we ran into**
* At first, we used the Pebble SDK in C, and tried to interface the C program with a Pebble.js program that sent post requests to the server. The C program got the accelerometer data, but it was difficult to work with the SDK and send the accelerometer data to the Pebble.js program. We also had lots of problems sending the post request from the Pebble.js file, so we decided to scrap the project and write the Pebble watch app entirely in Javascript. Then, we had problems getting the accelerometer data using the Pebble.js SDK, but eventually we got it working by using the documentation. Finally, analyzing the accelerometer data was challenging as we had to work with large amounts of data and interpret it correctly.


**Accomplishments that we are proud of**
* We were new to the Pebble, and at first, programming for it was difficult, especially in C. Eventually, we were able to make a watch app in Pebble.js.


**What we learned**
* Pebble SDK
* SendGrid API
* HTTP requests (POST and GET)


**What's next for BDPebbleTennis**
* Potential additions to BDPebbleTennis include integrating it with smart court systems, such as Hawkeye. These systems are used all around the world to tell whether shots are in or out. These systems can provide valuable data to indicate the quality of shots players are making while practicing. In addition, while playing a match with a friend, or just practicing, systems like these can help settle on court disputes without argument.


####Built With
* pebble
* node.js
* ios
* sendgrid
* javascript
* socket.io
* express.js





