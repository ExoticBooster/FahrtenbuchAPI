const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//parse request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

// simple route
app.get("/", (req, res) => {
  res.render('home');
});


//import routes
const addressRoute = require('./routers/address');
const carRoute = require('./routers/car');
const driverRoute = require('./routers/driver');
const maintenanceRoute = require('./routers/maintenance');
const tripRoute = require('./routers/trip');
try{
app.use('/address', addressRoute);
app.use('/car', carRoute);
app.use('/driver', driverRoute);
app.use('/maintenance', maintenanceRoute)
app.use('/trip', tripRoute)}
catch(e){
  log(e)
}

//error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



