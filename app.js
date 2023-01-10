const express = require("express");
const redis = require("redis");
const app = express();
const client = redis.createClient();
const xml2js = require("xml2js");
const fs = require("fs");
// GET route
app.get("/", function (req, res, next) {
  client.connect().then(() => {
    const parser = new xml2js.Parser({ attrkey: "ATTR" });

    let xml_string = fs.readFileSync("config.xml", "utf8");

    parser.parseString(xml_string, function (error, result) {
      client
        .set(
          "subdomains",
          JSON.stringify(result.config.subdomains[0].subdomain)
        )
        .then((result) => console.log(result));

      result.config.cookies[0].cookie.forEach((elem) => {
        client
          .set(`cookie:${elem["ATTR"].name}:${elem["ATTR"].host}`, elem._)
          .then((result) => console.log(result));
      });
    });

    client.quit();
  });

  next();
});

app.listen(5000, function () {
  console.log("Web app is listening on port 5000");
});
