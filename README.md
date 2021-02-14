## Summary
<b>Task Tracker:</b>\
Add task message, time and reminder status\
<b>Delete the task:</b>\
The task records are stored in Firebase Database
<br>

## Screenshot

![image](Screen.png)
<br>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
<br>

## Adding Material UI

### `npm install @material-ui/core`
https://material-ui.com/
<br>
Example:
```
	<Button disabled={!input} variant="contained"            color="primary">
         Primary
    </Button>
```
<br>

## Connecting to Firebase

Firebase is suite of tool (db+auth+deploy+many more things)

### `npm install -g firebase-tools`

### `npm i firebase`

<br>

## Deploying to Firebase

Step 1:  `firebase init`

- Type build when prompted for folder name

Step 2: `npm run build`

Step 3: `firebase deploy`

<br>

## View Live Demo at: 
https://task-tracker-2e6d8.web.app/
