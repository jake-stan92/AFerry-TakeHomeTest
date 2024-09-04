# AFerry Take Home Test

## How to?

- clone repo
- cd to newly cloned directory
- run npm install
- run 'npm run server:start'
- run 'npm invoke' (in a seperate terminal window)

The function will 'POST' all records (in the correct format) that are of type 'booking_completed' to the mock server on port 3000 and print the successfully sent records in the terminal window.

Uncommenting line 26 in 'index.js' will print out the successful nature of the POST request for each record in the terminal. \*Another build will need to take place following the uncommenting - 'npm run build'.

## Testing

Tests can be run using 'npm run test'
