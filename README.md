# Toastercise

Build stacked alerts triggered off the mockServer service and "New Submission" button.

## Notes

- I started by containerizing this app using a node v16 image because it didn't build on my local v18
- The react app itself is located in /frontend/toast
- The container build step runs the test suite
- I used a React State named globalState for storing data in the frontend, eg. "liked submissions" state
- I used MUI Snackbar and the same MUI architecture as Content.js to save time as recommended
- 

## Setting up your local

Docker Compose config provisions a container serving the react build via nginx. 

To use the app, run:

```
docker-compose build
docker-compose up
```

You should now be able to access the app at http://localhost:8080/


