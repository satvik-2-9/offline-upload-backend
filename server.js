const express = require("express");
const app = express();

var fs = require("fs");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const port = 5001;

app.use((req, res, next) => {
  /* here adding all these headers to avoid the cors error .  */
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept, Authorization"
  );

  /*a
       usually the browser first sends an options request to find out the type of
       request it can send , therefore , it will get its response here.
    */
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.post("/", function (req, res, next) {
  console.log(req.body);

  var dataurl = req.body.file;
  var regex = /^data:.+\/(.+);base64,(.*)$/;
  var matches = dataurl.match(regex);
  var ext = matches[1];
  var data = matches[2];
  var buffer = Buffer.from(data, "base64");
  fs.writeFileSync("data." + ext, buffer);
  res.status(200);
});

app.listen(port, () => {
  console.log("Server started listening on post 5001");
});
