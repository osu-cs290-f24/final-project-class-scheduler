var fs = require("fs")
var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')

var classData = require("./classData.json")

var app = express()
var port = process.env.PORT || 8500

app.engine("handlebars", exphbs.engine({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.static('static'))

app.get("/", function(req, res, next){
    res.status(200).sendFile(__dirname + "/static/index.html")
})


app.post('/addClass', function (req, res, next) {
    console.log("  -- req.body:", req.body)
    if (req.body) {
        classData[req.body.name] = {
          name: req.body.name,
          subject: req.body.subject,
          fromTime: req.body.fromTime,
          toTime: req.body.toTime,
          days: req.body.days
        }
        fs.writeFile(
          __dirname + "/classData.json",
          JSON.stringify(classData, null, 2),
          function (err, result) {
            if (!err) {
              res.status(200).send()
            } else {
              res.status(500).send("Server error.  Try again soon.")
            }
          }
        )
      } else {
        next()
      }
  })
  

app.get('*', function (req, res) {
    res.render("partials/404")
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})