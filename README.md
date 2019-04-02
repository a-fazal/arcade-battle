# team17

## Instructions: How to run locally & develop

You can clone the repo with

```
git clone https://github.com/csc309-winter-2019/team17.git
```

(or download as a zip)

Then

```
cd team17
``` 
(or where you saved the folder)

And
```
npm install
```
```
cd client
npm install
```
Then
```
cd ..
npm run dev
```
This will run the front-end (client) and backend (server.js) simultaneously, you can also run them separately in different terminals.

You must also put a .env file in the root folder in order to connect to the database.

## Instructions: Heroku Deployment
Add the heroku repo as a remote in your local repo
```
heroku git:remote -a arcade-battle
```
In order to deploy to heroku after you make a commit run
```
git push heroku master
```

Find the web app at: arcade-battle.herokuapp.com

## Instructions: Data initialization
Data is initialized programmatically by sending a POST request to our '/resetdata' endpoint

All objects to be loaded into MongoDB are stored in initData.js
