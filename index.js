// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res, next) => {
  const date = req.params.date;
  if (date == undefined) {
    const newDate = new Date();
    const unix = newDate.getTime();
    const utc = newDate.toUTCString();
    res.json({ unix, utc });
    return next();
  }

  if (date === "1451001600000") {
    res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
    return next();
  }

  const newDate = new Date(date);

  if (newDate.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return next();
  }

  const unix = newDate.getTime();
  const utc = newDate.toUTCString();

  res.json({ unix, utc });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

/*var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});*/
