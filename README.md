Yea or Nay
=====================

A multi user debateRoom platform to allow users to voice their opinions about topics that are important to them.

### Usage

Clone this repo then create your own git repo.

```
git clone git@github.com:kevinmacarthur/final_project.git
cd final_project
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
```

Install the dependencies and start each server.

For the Websocket Server

```
cd Websocket_server
npm install
npm start
```
In a seperate terminal window/tab install dependencies for Yea or nay server

```
cd Yea_or_nay
npm install
npm start
```
Once dependencies have been install open http://localhost:3000 and enjoy

## Final Product

### Select a username and browse active debates available to either view or join as well as what's going on in the world for inspiration!

### Create your own Debate, take your stance and decide if you want to allow viewers!

### Support your stance with great points and select whether you learned something new!

### As a viewer select a side throughout the arguement with whoever you agree with and give like great points during the debate to help decide a winner!

### Offensive comments are flagged and unable to be liked

### See who won and a score breakdown before returning home and joining another debate!


## Dependencies

### For Yea_or_Nay

-  "bootstrap": "^4.1.3",
-  "prop-types": "^15.6.2",
-  "react": "16.6.3",
-  "react-confetti": "^2.3.0",
-  "react-dom": "16.6.3",
-  "react-router-dom": "^4.3.1",
-  "react-sizeme": "^2.5.2",
-  "socket.io": "^2.1.1",
-  "uuid": "^3.3.2"

### For Websocket_server

- "dotenv": "^6.1.0",
-  "express": "^4.16.4",
-  "newsapi": "^2.4.0",
-  "perspective-api-client": "^3.0.0",
-  "socket.io": "^2.1.1",
-  "uuid": "^3.3.2"

