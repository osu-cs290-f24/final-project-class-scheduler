var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')

var classData = require("./classData.json")

var app = express()
var port = process.env.PORT || 8000

app.engine("handlebars", exphbs.engine({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars")

app.use(express.static('static'))

app.get("/", function(req, res, next){
    
})

app.get('*', function (req, res) {
    res.render("partials/404")
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})