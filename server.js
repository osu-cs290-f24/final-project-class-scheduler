  var fs = require("fs")
  var path = require('path')
  var express = require('express')
  var exphbs = require('express-handlebars')

  var classData = {}

  fs.readFile(path.join(__dirname, 'classData.json'), 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading class data file:", err);
    } else {
        classData = JSON.parse(data);
    }
});

  var app = express()
  var port = process.env.PORT || 8500

  app.engine("handlebars", exphbs.engine({
      defaultLayout: "main"
  }))
  app.set("view engine", "handlebars")

  app.use(express.json())
  app.use(express.static('static'))

  app.get("/", function(req, res, next){
    fs.readFile(path.join(__dirname, "classData.json"), "utf8", (err, data) => {
      if (err) {
        console.error("Error reading class data file:", err);
        return res.status(500).send("Error loading schedule.");
      }
      var classData = JSON.parse(data);
      var classesArray = Object.values(classData); // Convert to an array
      res.status(200).render('schedule', { classes: classesArray });
    })
  })

  app.post('/addClass', function (req, res, next) {
      console.log("  -- req.body:", req.body)
      if (req.body) {
          fs.readFile(path.join(__dirname, "classData.json"), "utf8", (err, data) => {
          if (err) {
            return res.status(500).send("Error reading class data file.");
          }
    
          var classData = JSON.parse(data);

          classData[req.body.name] = {
            name: req.body.name,
            subject: req.body.subject,
            fromTime: req.body.fromTime,
            toTime: req.body.toTime,
            days: req.body.days
          }
          fs.writeFile(path.join(__dirname, "classData.json"), JSON.stringify(classData, null, 2), function (err) {
              if (!err) {
                res.status(200).send()
              } else {
                res.status(500).send("Server error.  Try again soon.")
              }
            }
          )
        })
        } else {
          next()
        }
    })

  app.delete('/deleteClass', function(req, res) {
    const classNameToDelete = req.body.name;
  
    // Read the current class data from the JSON file using an absolute path
    fs.readFile(path.join(__dirname, 'classData.json'), 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send("Error reading class data file.");
      }
  
      var classData = JSON.parse(data);
  
      // Delete the class from the classData object
      delete classData[classNameToDelete];
  
      // Write the updated data back to the JSON file
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
    })
  })

  app.get('*', function (req, res) {
      res.render("partials/404")
  })

  app.listen(port, function () {
      console.log("== Server is listening on port", port)
  })

  