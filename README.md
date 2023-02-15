# Toastercise

Build stacked alerts triggered off the mockServer service and "New Submission" button.

## Notes

- I started by containerizing this app using a node v16 image because it didn't build on my local v18
- The react app itself is located in `/frontend/toast`
- The container build step runs the test suite
- I used a React Context named GlobalState for storing data in the frontend, eg. "liked submissions" state
- I used MUI Snackbar and the same MUI architecture as Content.js to save time as recommended

## Technical Considerations

### Using a global context

I decided to use a global context so that:
- The save logic could be housed along with the toast's `LIKE` button in the `NewSubmissionButton` component
- The load logic could be housed in the `Liked` component

### When to populate the list with a newly liked submission

When planning this solution out, I noticed that there was a decision to be made around when to populate the list with a newly liked submission.

The new like can be added either before or after receiving a success response from the save call. I decided to populate the list after a successful save.

This decision means there's some lag between when the user clicks "LIKE" and when the object gets appended onto the list, but this seemed better to me than instantly populating the list but perhaps losing the state if the user closes their browser, disconnects from the network, etc.

## Setting up your local

Docker Compose config provisions a container serving the react build via nginx. 

To use the app, run:

```
docker-compose build
docker-compose up
```

You should now be able to access the app at http://localhost:8080/
