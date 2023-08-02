var fs = require('fs');
var mysql = require('mysql');
var cheerio = require('cheerio');
var express = require('express');
var app = express();
var cors = require('cors');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Connect to the MySQL server
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '8888',
  database : 'athena_schema'
});


pool.query('SELECT courses.course_Name, courses.course_Hours, courses.course_id, professors.professor_Name FROM courses JOIN professors ON courses.professor_id = professors.professor_ID', function (error, results, fields) {
  if (error) throw error;

  fs.readFile('./client/src/login/course.html', 'utf8', function(err, contents) {
    if (err) {
      console.error('An error occurred while reading the file:', err);
      return;
    }
    var $ = cheerio.load(contents);
  
    // For each row in the results...
    results.forEach(function(row) {
      // Create a new table row
      var tr = $('<tr>');
      
      // For each field in the row...
      Object.keys(row).forEach(function(field) {
        // Add a new table cell to the row
        tr.append('<td>' + row[field] + '</td>');
      });

      // Add a new table cell with a button to the row
      tr.append('<td><button>Add Course</button></td>');
      
      // Add the row to the table in the HTML
      $('table').append(tr);
    });

    // Write the updated HTML back to the file
    fs.writeFile('./client/src/login/course.html', $.html(), function(err) {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
});


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/src/login/course.html');
});

app.listen(8080);


// Serve static files from the client/src/login directory
app.use(express.static(__dirname + '/client/src/login'));
app.use(cors());

app.get("/", (req, res) => {
    res.setHeader("Content-type","text/html");
    res.sendFile(__dirname + "/client/src/login/login.html");
});

app.listen(3006, () => console.log('server started'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', function(req, res) {
  var username = parseInt(req.body.username); // Parse the username as an integer
  if (isNaN(username)) {
    res.status(400).send('Student ID must be a number.');
    return;
  }
  var password = req.body.password;
  var stuname = req.body.stuname;
  var age = req.body.age;
  var gender = req.body.gender;
  var major = req.body.major;

  console.log('Received registration details:', req.body);

  var query = 'INSERT INTO students (sid, password, stu_name, age, gender, major) VALUES (?, ?, ?, ?, ?, ?)';
  pool.query(query, [username, password, stuname, age, gender, major], function(error, results, fields) {
    if (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred during registration.');
      return;
    }
    console.log('Query executed successfully, results:', results);
    res.send('Registration successful.');  });
});


