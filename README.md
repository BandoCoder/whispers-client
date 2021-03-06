# Whispers

[Live app]https://whispers.bandocoder.vercel.app/

[Client repository]https://github.com/BandoCoder/whispers-client

[API documentation]https://github.com/BandoCoder/whispers-api/blob/main/README.md

[API repository]https://github.com/BandoCoder/whispers-api/

## Screenshots

![Desktop Screenshot](./src/img/whispersscreenshot1.PNG)
![Mobile Screenshot](./src/img/whispersscreenshot2.PNG)

## Description

This app allows you to post a secret (Whisper) for the public to view. Anyone can view the whispers logged in or not. To post a whisper, or like a whisper, you must signup and login. The whispers you make are saved to your profile and you can view them later.

There is no delete button, this is on purpose. Once you tell a secret, you cannot untell it.

The next steps is to implement an admin account feature, that allows an admin (or moderator) to view reported posts and remove them as needed. The back end needs a table for this, then the front end needs logic to add a post to the table and hide it after a whisper has been reported 3 times.

Also needs to display number of likes a post has recieved (not just a counter in the table, this needs to be returned by the database).

## Demo

You can create your own account, or you can use this demo account:

#### username: admin

#### password: Password1!

## Instructions

1. Clone the repo
2. run 'npm i' to install dependencies
3. run 'npm start'

## Technical

#### Front

React.js

HTML5

JSX

CSS

Moment

#### Back

Node.js

Postgres

REST

Express

Mocha

Chai

Fetch (for unsplash api)
