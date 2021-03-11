var express = require('express');
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.all("*", function (req, res, next) {
  const allowedOrigins = [
    "http://localhost:4200", //URL
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, x-cm-user-id"
  );
  next();
});

require('./routes/user.routes')(app);

// Connecting to the database
dbConfig.connectToServer(function (err, client) {
  if (err) console.log(err);
  let db = dbConfig.getDb();
  let mongoClient = dbConfig.getClient();
  app.set("mongoInstance", db);
});

// define a simple route
app.get('/', (req, res) => {
  res.json({
    "message": "Welcome"
  });
});

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
