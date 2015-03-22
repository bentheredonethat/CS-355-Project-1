// Module dependencies

var express = require('express'),
    mysql = require('mysql');

// Application initialization

var connection = mysql.createConnection({
    host: '...',
        user: '...',
        password: '...'
});

var app = module.exports = express.createServer();

// Database setup

connection.query('USE ...', function (err) {
    if (err) throw err;
});

// Configuration

app.use(express.bodyParser());

// Main page with two links to view the table and drop down menu


var htmlHeader = '<html><head><title>Rock Climbing Database</title></head><body>';
var htmlFooter = '</body></html>';

function handleError(res, error) {
    console.log(error);
        res.send(error.toString());
}

// skeleton for user view of html when interacting with table
function buildUserViewForClimber(result) {

        // Build the HTML table from the data in the Climber table
        var responseHTML = htmlHeader + '<h1>Climber Information</h1>';

        //Dynamic populating rows from the records returned
        for (var i = 0; i < result.length; i++) {
            responseHTML += '<ul><li>Name: ' + result[i].climberName + '</li>' +
		'<li>US: ' + result[i].hardestGradeUS + '</li>' +
		'<li>country : ' + result[i].country + '</li>' +
		'<li>birthyear : ' + result[i].birthYear + '</li>' +
		'<li>Euro: ' + result[i].hardestGradeEuro + '</li></ul>'
	}
    responseHTML += htmlFooter;
    
    return responseHTML;
}

// skeleton for user view of html when interacting with table
function buildUserViewFoRoute(result) {
    
    // Build the HTML table from the data in the route table
    var responseHTML = htmlHeader + '<h1>route Information</h1>';
    
    //Dynamic populating rows from the records returned
        for (var i = 0; i < result.length; i++) {
            responseHTML += '<ul><li>Name: ' + result[i].routeName + '</li>' +
		'<li>location: ' + result[i].locationOfRoute + '</li>' +
		'<li>difficulty US : ' + result[i].difficultyUS + '</li>' +
		'<li>difficulty Euro: ' + result[i].difficultyEuro + '</li>' +
		'<li>Type of Climb : ' + result[i].typeOfClimb + '</li>' +
		'<li># pitches : ' + result[i].numberPitches + '</li>' +
		'<li>who did it first : ' + result[i].firstAscent + '</li>' +
		'<li>who set the route: ' + result[i].routeSetter + '</li></ul>'
	}
    responseHTML += htmlFooter;
        
    return responseHTML;
}

app.get('/', function (req, res) {
    req.query.name
    res.send('<html><head><title>Rock Climbing Database</title></head><body>' +
                 '<a href="/Climber/view/table">View Climber HTML Table</a>' +
             '<br />' +
             '<a href="/Climber/add">Add a Climber</a><br />'
	     
	     + '<br/>'+
	     
	     '<a href="/Route/view/table">View Route HTML Table</a>' +
                 '<br />' +
             '<a href="/Route/add">Add a Route</a><br />'

	     + '<br/>' +
	     '<a href="/sponsor/view/table">View Sponsor HTML Table</a>' +
             '<br />' +
             '<a href="/sponsor/add">Add a Sponsor</a><br />'
	     
	     +'<br/>'+
	     '<a href="/Location/view/table">View Location HTML Table</a>' +
             '<br />' +
             '<a href="/Location/add">Add a Location</a><br />'
	    

	     +'<br/>'+
	     '<a href="/Climber_Sponsor/view/table">View Climber_Sponsor HTML Table</a>' +
             '<br />' +
             '<a href="/Climber_Sponsor/add">Add a Climber_Sponsor</a><br />'


	     +'<br/>'+
	     '<a href="/Climber_Route/view/table">View Climber_Route HTML Table</a>' +
             '<br />' +
             '<a href="/Climber_Route/add">Add a Climber_Route</a><br />'

	    );
});

// HTML Example with data populated from the Climber table

app.get('/Climber/view/table', function (req, res) {
    
    var myQry = 'SELECT * FROM Climber';
    
    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
			 if (err) {
			     console.log(err);
			     throw err;
			     res.send('An error occured');
			     
			 }
			 else {
			     // Build the HTML table from the data in the Climber table
			     var responseHTML = '<h1>Table Example</h1>';
			     responseHTML += '<table border=1>';
			     responseHTML = responseHTML + '<tr><th>climberID Number</th><th>Name</th><th>More Info</th><th>Edit</th><th>Delete</th>';
			     //Dynamic populating rows from the records returned
			     for (var i = 0; i < result.length; i++) {
				 responseHTML += '<tr><td>' + result[i].climberID + '</td>' +
				     '<td>' + result[i].climberName + '</td>' +
				     '<td><a href="/Climber/?climberID=' + result[i].climberID + '">more info</a>' +
				     '<td><a href="/Climber/edit?climberID=' + result[i].climberID + '">edit</a>' +
				     '<td><a href="/Climber/delete?climberID=' + result[i].climberID + '">delete</a></tr>'
			     }
			     
			     responseHTML += '</table>';
			     res.send(responseHTML);

			     

			 }
		     }
		    );
});

// Example of an HTML drop down menu with data from the Climber table

app.get('/Climber/view/dropdown', function (req, res) {
    
    var myQry = 'SELECT * FROM Climber';
    
    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
                         if (err) {
                             console.log(err);
			     throw err;
			     res.send('An error occured');
			     
			 }
			 else {
			     // Build the HTML table from the data in the Student table
			     var responseHTML = '<h1>Drop Down Menu Example</h1>';
			     responseHTML += '<form method="GET" action="/Climber/">';
			     responseHTML += 'Select a climber: <select name="climberID" id="climber/id">';
			     
			     //Dynamic populating rows from the records returned
			     for (var i = 0; i < result.length; i++) {
                                 responseHTML += '<option value="' + result[i].climberID + '">' + result[i].climberName + '</option>';
                             }
			     
			     responseHTML += '</select>';
			     responseHTML += '&nbsp;<input type="submit" />';
			     responseHTML += '</form>';
			     res.send(responseHTML);
                         }
                     }
		    );
});

// Display information about a Climber when given their Student_number
app.get('/Climber/', function (req, res) {
    
    var myQry = 'SELECT * FROM Climber WHERE climberID=' + req.query.climberID;
    
    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
			 if (err) {
			     console.log(err);
			     throw err;
			     res.send('An error occured');
			 }
			 else {
			     res.send(buildUserViewForClimber(result));
			 }
		     }
		    );
});

// Display information about a Climber when given their climberID and allow them to edit it.
app.get('/Climber/edit', function (req, res) {
    
    var myQry = 'SELECT * FROM Climber WHERE climberID=' + req.query.climberID;
    
    console.log(myQry);
    
    connection.query(myQry, function (err, result) {
        if (err) {
            handleError(res, err);
        }
	else {
	    
	    // Build the HTML table from the data in the climber table
	    var responseHTML = htmlHeader + '<h1>Edit climber Information</h1>';
	    
	    responseHTML += '<form action="/Climber/update" method="GET">';

	    //Dynamic populating rows from the records returned
			            if (result.length == 1) {
					
					responseHTML += 'Name: <input type="text" name="climberName" id="climberName" value="' + result[0].climberName + '" /><br />' +
					    'country: <input type="text" name="country" id="country" value="' + result[0].country + '" /><br />' +
					    'birth year: <input type="text" name="birthYear" id="birthYear" value"' + result[0].birthYear + '" /><br />' +
					    'euro: <input type="text" name="hardestGradeEuro" id="hardestGradeEuro" value="' + result[0].hardestGradeEuro + '" /><br />' +
					    'us: <input type="text" name="hardestGradeUS" id="hardestGradeUS" value="' + result[0].hardestGradeUS + '" /><br />' +
					    '<input type="hidden" name="climberID" id="climberID" value="' + result[0].climberID + '" />' +
					    '<input type="submit" /></form>' +
					    htmlFooter;
					
					res.send(responseHTML);
				    }
	    else {
                res.send('More than one record was returned.')
            }
        }
    }
		    );
});

// Update a Climber's fields given their climberID
app.get('/Climber/update', function (req, res) {
    
    var myQry = 'UPDATE Climber SET' +
	' climberName=\'' + req.query.climberName + '\', ' +
	'country=\'' + req.query.country + '\', ' +
	'hardestGradeEuro=\'' + req.query.hardestGradeEuro + '\', ' +
	        'hardestGradeUS=\'' + req.query.hardestGradeUS + '\', ' +
	'birthYear=' + req.query.birthYear +
	' WHERE climberID=' + req.query.climberID;
    
    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
				           if (err) {
					       handleError(res, err);
					   }
			 else {
			     connection.query('SELECT * FROM Climber WHERE climberID = ' + req.query.climberID,
					      function (err, result) {
						  if (err) {
						      console.log(err);
				                      res.send('An error occurred');
                                  }
						  if (result.length == 1) {
						      res.send(buildUserViewForClimber(result));
						  }
						  else {
						      res.send('No student found for that climberID.');
                                  }
					      });
			 }
		     }
		    );
});

// Display a form that allows user to enter Climber
app.get('/Climber/add', function (req, res) {
    
    var responseHTML = htmlHeader;
    
    responseHTML += '<h1>Insert a Climber</h1>' +
	'<form action="/Climber/insert" method="GET">' +
	'<input type="hidden" name="climberID" id="climberID" />' +
	'<label for="climberName">Name</label> <input type="text" name="climberName" id="climberName" /><br />' +
	    '<label for="country">country</label> <input type="text" name="country" id="country" /><br />' +
	'<label for="birthYear">birth year</label> <input type="text" name="birthYear" id="birthYear" /><br />' +
	'<label for="hardestGradeUS">hardest gradest us</label> <input type="text" name="hardestGradeUS" id="hardestGradeUS" /><br />' +
	'<label for="hardestGradeEuro">hardest grade euro</label> <input type="text" name="hardestGradeEuro" id="hardestGradeEuro"><br />' +
	'<input type="submit" /></form>';

        responseHTML += htmlFooter;
        res.send(responseHTML);
});

// Display a form that allows user to enter Climber
app.get('/Climber/insert', function (req, res) {

    var myQry = 'INSERT INTO Climber (climberName, hardestGradeUS, hardestGradeEuro, country, birthYear) VALUES (' +
	'\'' + req.query.climberName + '\', ' +
	'\'' + req.query.hardestGradeUS + '\', ' +
	        '\'' + req.query.hardestGradeEuro + '\', ' +
	'\'' + req.query.country + '\', ' +
	req.query.birthYear +
	')';
    
    
    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
			 if (err) {
			     handleError(res, err);
			 }
			 else {
			     
			     // are you querying the right thing?
			     console.log('SELECT * FROM Climber WHERE climberName= \'' + req.query.climberName + '\' and ' +
									                ' hardestGradeUS=\'' + req.query.hardestGradeUS + '\' and ' +
					 ' hardestGradeEuro=\'' + req.query.hardestGradeEuro + '\' and ' +
					 ' country=\'' + req.query.country + '\' and ' +
					 ' birthYear=' + req.query.birthYear);
			     
					                    connection.query('SELECT * FROM Climber WHERE climberName= \'' + req.query.climberName + '\' and ' +
									                     ' hardestGradeUS=\'' + req.query.hardestGradeUS + '\' and ' +
									                     ' hardestGradeEuro=\'' + req.query.hardestGradeEuro + '\' and ' +
									                     ' country=\'' + req.query.country + '\' and ' +
									                     ' birthYear=' + req.query.birthYear,

									                                   function (err, result) {
                                  console.log(result);
													                                         if (err) {
                                      handleError(res, err);
                                  }
													                                         else if (result.length == 1) {
                                      res.send(buildUserViewForClimber(result));
                                  }
													                                         else {
                                      res.send('No student found for that climberID.');
                                  }
                              });
					                }
				       }
			     );
});

// Route for deleting a Climber record from the database.
app.get('/Climber/delete', function (req, res) {

        var myQry = 'DELETE FROM Climber WHERE climberID=' + req.query.climberID;

        console.log(myQry);

        connection.query(myQry,
			      function (err, result) {
				           if (err) {
					                    handleError(res, err);
					                }
				           else {
					                    res.send('climber ID Number ' + req.query.climberID + ' successfully deleted.');
					                }
				       }
			     );
});

// HTML Example with data populated from the Route table

app.get('/Route/view/table', function (req, res) {

        var myQry = 'SELECT * FROM Route';

        console.log(myQry);

        connection.query(myQry,
			      function (err, result) {
				           if (err) {
					                    console.log(err);
					                    throw err;
					                    res.send('An error occured');

					                }
				           else {
					                    // Build the HTML table from the data in the Route table
					                    var responseHTML = '<h1>Table Example</h1>';
					                    responseHTML += '<table border=1>';
					                    responseHTML = responseHTML + '<tr><th>routeID Number</th><th>Name</th><th>More Info</th><th>Edit</th><th>Delete</th>';
					                    //Dynamic populating rows from the records returned
					                    for (var i = 0; i < result.length; i++) {
								                 responseHTML += '<tr><td>' + result[i].routeID + '</td>' +
								                                 '<td>' + result[i].routeName + '</td>' +
								                                 '<td><a href="/Route/?routeID=' + result[i].routeID + '">more info</a>' +
								                                 '<td><a href="/Route/edit?routeID=' + result[i].routeID + '">edit</a>' +
								                                 '<td><a href="/Route/delete?routeID=' + result[i].routeID + '">delete</a></tr>'
								             }

					                    responseHTML += '</table>';
					                    res.send(responseHTML);
					                }
				       }
			     );
});

// Example of an HTML drop down menu with data from the route table

app.get('/Route/view/dropdown', function (req, res) {

        var myQry = 'SELECT * FROM Route';

        console.log(myQry);

        connection.query(myQry,
			                      function (err, result) {
                         if (err) {
                             console.log(err);
			                                  throw err;
			                                  res.send('An error occured');

			                              }
						                           else {
									                                    // Build the HTML table from the data in the route table
									                                    var responseHTML = '<h1>Drop Down Menu Example</h1>';
									                                    responseHTML += '<form method="GET" action="/Route/">';
									                                    responseHTML += 'Select a route: <select name="routeID" id="routeID">';

									                                    //Dynamic populating rows from the records returned
									                                    for (var i = 0; i < result.length; i++) {
                                 responseHTML += '<option value="' + result[i].routeID + '">' + result[i].routeName + '</option>';
                             }

									                                    responseHTML += '</select>';
									                                    responseHTML += '&nbsp;<input type="submit" />';
									                                    responseHTML += '</form>';
									                                    res.send(responseHTML);
                         }
                     }
			                  );
});

// Display information about a route when given their routeID
app.get('/Route/', function (req, res) {

        var myQry = 'SELECT * FROM Route WHERE routeID=' + req.query.routeID;

        console.log(myQry);

        connection.query(myQry,
			                      function (err, result) {
                         if (err) {
                             console.log(err);
			                                  throw err;
			                                  res.send('An error occured');

			 }
						  else {
						      
						      /*
						      var responseHTML = htmlHeader + '<h1>route Information</h1><br/>';
						      
						      //Dynamic populating rows from the records returned
						      for (var i = 0; i < result.length; i++) {
							  responseHTML += '<ul><li>Name: ' + result[i].routeName + '</li>' +
							      '<li>location: ' + result[i].locationOfRoute + '</li>' +
							      '<li>difficulty US : ' + result[i].difficultyUS + '</li>' +
							      '<li>difficulty Euro: ' + result[i].difficultyEuro + '</li>' +
							      '<li>Type of Climb : ' + result[i].typeOfClimb + '</li>' +
							      '<li># pitches : ' + result[i].numberPitches + '</li>' +
							      '<li>who did it first : ' + result[i].firstAscent + '</li>' +
							      '<li>who set the route: ' + result[i].routeSetter + '</li></ul>'
						      }
						      responseHTML += htmlFooter;
						      res.send(responseHTML);
						      */

						      res.send(buildUserViewFoRoute(result));
						      }
					      }
			);
});

// Display information about a route when given their routeID and allow them to edit it.
app.get('/Route/edit', function (req, res) {

    var myQry = 'SELECT * FROM Route WHERE routeID=' + req.query.routeID;
    
    console.log(myQry);
    
    connection.query(myQry, function (err, result) {
        if (err) {
            handleError(res, err);
        }
	else {
	    
	    // Build the HTML table from the data in the route table
	    var responseHTML = htmlHeader + '<h1>Edit route Information</h1>';
	    
	    responseHTML += '<form action="/Route/update" method="GET">';

	    //Dynamic populating rows from the records returned
	    if (result.length == 1) {
		
		responseHTML += 'Name: <input type="text" name="routeName" id="routeName" value="' + result[0].routeName + '" /><br />' +
		    'location: <input type="text" name="locationOfRoute" id="locationOfRoute" value="' + result[0].locationOfRoute + '" /><br />' +
		    'first Ascent: <input type="text" name="firstAscent" id="firstAscent" value"' + result[0].firstAscent + '" /><br />' +
		    'climbing type: <input type="text" name="typeOfClimb" id="typeOfClimb" value"' + result[0].typeOfClimb + '" /><br />' +
		    '# pitches: <input type="text" name="numberPitches" id="numberPitches" value"' + result[0].numberPitches + '" /><br />' +
		    'who made route: <input type="text" name="routeSetter" id="routeSetter" value"' + result[0].routeSetter + '" /><br />' +
		    'euro: <input type="text" name="difficultyEuro" id="difficultyEuro" value="' + result[0].difficultyEuro + '" /><br />' +
		    'us: <input type="text" name="difficultyUS" id="difficultyUS" value="' + result[0].difficultyUS + '" /><br />' +
		    '<input type="hidden" name="routeID" id="routeID" value="' + result[0].routeID + '" />' +
		    '<input type="submit" /></form>' +
		    htmlFooter;
		
		res.send(responseHTML);
            }
	    else {
                res.send('More than one record was returned.')
            }
        }
    }
		    );
});

// Update a route's fields given their routeID
app.get('/Route/update', function (req, res) {
    
    var myQry = 'UPDATE Route SET' +
	' routeName=\'' + req.query.routeName + '\', ' +
	'locationOfRoute=\'' + req.query.locationOfRoute + '\', ' +
	'difficultyEuro=\'' + req.query.difficultyEuro + '\', ' +
	'difficultyUS=\'' + req.query.difficultyUS + '\', ' +
	'firstAscent=\'' + req.query.firstAscent + '\', ' +
	'typeOfClimb=\'' + req.query.typeOfClimb + '\', ' +
	'routeSetter=\'' + req.query.routeSetter + '\', ' +
	'numberPitches=' + req.query.numberPitches +
	' WHERE routeID=' + req.query.routeID;
    
    console.log(myQry);
    
    connection.query(myQry,
			      function (err, result) {
				  if (err) {
					                    handleError(res, err);
				  }
				  else {
				      connection.query('SELECT * FROM Route WHERE routeID = ' + req.query.routeID,
						       function (err, result) {
							   if (err) {
							       console.log(err);
				                               res.send('An error occurred');
							   }
							   if (result.length == 1) {
							       res.send(buildUserViewForRoute(result));
							   }
							   else {
							       res.send('No route found for that routeID.');
							   }
						       });
				  }
			      }
		    );
});

// Display a form that allows user to enter Route
app.get('/Route/add', function (req, res) {

    var responseHTML = htmlHeader;
    
    responseHTML += '<h1>Insert a Route</h1>' +
	'<form action="/Route/insert" method="GET">' +
	'<input type="hidden" name="routeID" id="routeID" />' +
	'<label for="routeName">Name</label> <input type="text" name="routeName" id="routeName" /><br />' +
	'<label for="locationOfRoute">Route Location</label> <input type="text" name="locationOfRoute" id="locationOfRoute" /><br />' +
	'<label for="difficultyUS">difficulty  us</label> <input type="text" name="difficultyUS" id="difficultyUS" /><br />' +
	'<label for="difficultyEuro">difficulty euro</label> <input type="text" name="difficultyEuro" id="difficultyEuro"><br />' +
	'<label for="firstAscent">FA:</label> <input type="text" name="firstAscent" id="firstAscent" /><br />' +
	'<label for="typeOfClimb">Climbing Type?</label> <input type="text" name="typeOfClimb" id="typeOfClimb"><br />' +
	'<label for="numberPitches"># Pitches</label> <input type="text" name="numberPitches" id="numberPitches"><br />' +
	'<label for="routeSetter">Who Made This Route?</label> <input type="text" name="routeSetter" id="routeSetter"><br />' +
	
    '<input type="submit" /></form>';
    
    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter Route
app.get('/Route/insert', function (req, res) {
    
    var myQry = 'INSERT INTO Route (routeName, difficultyUS, difficultyEuro, locationOfRoute, firstAscent, typeOfClimb, numberPitches, routeSetter) VALUES (' +
	'\'' + req.query.routeName + '\', ' +
	'\'' + req.query.difficultyUS + '\', ' +
	'\'' + req.query.difficultyEuro + '\', ' +
	'\'' + req.query.locationOfRoute + '\', ' +
	'\'' + req.query.firstAscent + '\', ' +
	'\'' + req.query.typeOfClimb + '\', ' +
	req.query.numberPitches + ', ' +
	'\' ' + req.query.routeSetter + '\'' +
	')';
    
    
    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
			 if (err) {
			     handleError(res, err);
			 }
			 else {
			     
			     // are you querying the right thing?
			     console.log('SELECT * FROM Route WHERE ' +
					 'routeName= \'' + req.query.routeName + '\' and ' +
					 'difficultyUS=\'' + req.query.difficultyUS + '\' and ' +
					 'difficultyEuro=\'' + req.query.difficultyEuro + '\' and ' +
					 'locationofRoute=\'' + req.query.locationOfRoute + '\' and ' +
					 'firstAscent=\'' + req.query.firstAscent + '\' and ' +
					 'typeOfClimb=\'' + req.query.typeOfClimb + '\' and ' +
					 'numberPitches=' + req.query.numberPitches + ' and ' +
					 'routeSetter=\' ' + req.query.routeSetter + '\'');
			     
			     connection.query('SELECT * FROM Route WHERE ' +
					      'routeName= \'' + req.query.routeName + '\' and ' +
					      'difficultyUS=\'' + req.query.difficultyUS + '\' and ' +
					      'difficultyEuro=\'' + req.query.difficultyEuro + '\' and ' +
					      'locationofRoute=\'' + req.query.locationOfRoute + '\' and ' +
					      'firstAscent=\'' + req.query.firstAscent + '\' and ' +
					      'typeOfClimb=\'' + req.query.typeOfClimb + '\' and ' +
					      'numberPitches=' + req.query.numberPitches + ' and ' +
					      'routeSetter=\' ' + req.query.routeSetter + '\'',

					      function (err, result) {
						  console.log(result);
						  if (err) {
						      handleError(res, err);
						  }
						  else if (result.length == 1) {
						      res.send(buildUserViewFoRoute(result));
						  }
						  else {
						      res.send('No student found for that routeID.');
						  }
                              });
			 }
		     }
		    );
});

// method for deleting a Route record from the database.
app.get('/Route/delete', function (req, res) {
    
    var myQry = 'DELETE FROM Route WHERE routeID=' + req.query.routeID;
    
    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
			 if (err) {
			     handleError(res, err);
			 }
				           else {
					       res.send('route ID Number ' + req.query.routeID + ' successfully deleted.');
					   }
		     }
		    );
});



// skeleton for user view of html when interacting with table
function buildUserViewFosponsor(result) {
    
    // Build the HTML table from the data in the sponsor table
    var responseHTML = htmlHeader + '<h1>sponsor Information</h1>';
    
    //Dynamic populating rows from the records returned
    for (var i = 0; i < result.length; i++) {
        responseHTML += '<ul><li>Name: ' + result[i].sponsorName + '</li>' +
	    '<li>gear offered: ' + result[i].gearOffered + '</li></ul>'
    }
    responseHTML += htmlFooter;
    //res.send(responseHTML);
    
    
        return responseHTML;
}

// HTML Example with data populated from the sponsor table

app.get('/sponsor/view/table', function (req, res) {
    
        var myQry = 'SELECT * FROM Sponsor';

        console.log(myQry);

        connection.query(myQry,
			      function (err, result) {
				           if (err) {
					                    console.log(err);
					                    throw err;
					                    res.send('An error occured');

					                }
				           else {
					                    // Build the HTML table from the data in the sponsor table
					                    var responseHTML = '<h1>Table Example</h1>';
					                    responseHTML += '<table border=1>';
					                    responseHTML = responseHTML + '<tr><th>sponsorID Number</th><th>Name</th><th>More Info</th><th>Edit</th><th>Delete</th>';
					                    //Dynamic populating rows from the records returned
					                    for (var i = 0; i < result.length; i++) {
								                 responseHTML += '<tr><td>' + result[i].sponsorID + '</td>' +
								                                 '<td>' + result[i].sponsorName + '</td>' +
								                                 '<td><a href="/sponsor/?sponsorID=' + result[i].sponsorID + '">more info</a>' +
								                                 '<td><a href="/sponsor/edit?sponsorID=' + result[i].sponsorID + '">edit</a>' +
								                                 '<td><a href="/sponsor/delete?sponsorID=' + result[i].sponsorID + '">delete</a></tr>'
								             }

					                    responseHTML += '</table>';
					                    res.send(responseHTML);
					                }
				       }
			     );
});

// Example of an HTML drop down menu with data from the sponsor table

app.get('/sponsor/view/dropdown', function (req, res) {

        var myQry = 'SELECT * FROM Sponsor';

        console.log(myQry);

        connection.query(myQry,
			                      function (err, result) {
                         if (err) {
                             console.log(err);
			                                  throw err;
			                                  res.send('An error occured');

			                              }
						                           else {
									                                    // Build the HTML table from the data in the sponsor table
									                                    var responseHTML = '<h1>Drop Down Menu Example</h1>';
									                                    responseHTML += '<form method="GET" action="/sponsor/">';
									                                    responseHTML += 'Select a sponsor: <select name="sponsorID" id="sponsorID">';

									                                    //Dynamic populating rows from the records returned
									                                    for (var i = 0; i < result.length; i++) {
                                 responseHTML += '<option value="' + result[i].sponsorID + '">' + result[i].sponsorName + '</option>';
                             }

									                                    responseHTML += '</select>';
									                                    responseHTML += '&nbsp;<input type="submit" />';
									                                    responseHTML += '</form>';
									                                    res.send(responseHTML);
                         }
                     }
			                  );
});

// Display information about a sponsor when given their sponsorID
app.get('/sponsor/', function (req, res) {

        var myQry = 'SELECT * FROM Sponsor WHERE sponsorID=' + req.query.sponsorID;

        console.log(myQry);

        connection.query(myQry,
			                      function (err, result) {
                         if (err) {
                             console.log(err);
			                                  throw err;
			                                  res.send('An error occured');

			                              }
						                           else {
                             var responseHTML = htmlHeader + '<h1>sponsor Information</h1><br/>';

									                                    //Dynamic populating rows from the records returned
									                                    for (var i = 0; i < result.length; i++) {
                                 responseHTML += '<ul><li>Name: ' + result[i].sponsorName + '</li>' +
														                                                 '<li>gear offered: ' + result[i].gearOffered + '</li></ul>'
                             }
									                                    responseHTML += htmlFooter;
									                                    res.send(responseHTML);
                         }
                     }
			                  );
});

// Display information about a sponsor when given their sponsorID and allow them to edit it.
app.get('/sponsor/edit', function (req, res) {

        var myQry = 'SELECT * FROM Sponsor WHERE sponsorID=' + req.query.sponsorID;

        console.log(myQry);

        connection.query(myQry, function (err, result) {
        if (err) {
            handleError(res, err);
        }
	            else {

			            // Build the HTML table from the data in the sponsor table
			            var responseHTML = htmlHeader + '<h1>Edit sponsor Information</h1>';

			            responseHTML += '<form action="/sponsor/update" method="GET">';

			            //Dynamic populating rows from the records returned
			            if (result.length == 1) {

					                responseHTML += 'Name: <input type="text" name="sponsorName" id="sponsorName" value="' + result[0].sponsorName + '" /><br />' +
					                        'gear offered: <input type="text" name="gearOffered" id="gearOffered" value="' + result[0].gearOffered + '" /><br />' +
					                        '<input type="hidden" name="sponsorID" id="sponsorID" value="' + result[0].sponsorID + '" />' +
					                        '<input type="submit" /></form>' +
					                        htmlFooter;

					                res.send(responseHTML);
            }
			            else {
                res.send('More than one record was returned.')
            }
        }
    }
			     );
});

// Update a sponsor's fields given their sponsorID
app.get('/sponsor/update', function (req, res) {

        var myQry = 'UPDATE Sponsor SET' +
	        ' sponsorName=\'' + req.query.sponsorName + '\', ' +
	        'gearOffered=\'' + req.query.gearOffered + '\' ' +
	        ' WHERE sponsorID=' + req.query.sponsorID;

        console.log(myQry);

        connection.query(myQry,
			      function (err, result) {
				           if (err) {
					                    handleError(res, err);
					                }
				           else {
					                    connection.query('SELECT * FROM Sponsor WHERE sponsorID = ' + req.query.sponsorID,
									                                   function (err, result) {
                                  if (err) {
                                      console.log(err);
				                                            res.send('An error occurred');
                                  }
													                                         if (result.length == 1) {
                                      res.send(buildUserViewFosponsor(result));
                                  }
													                                         else {
                                      res.send('No sponsor found for that sponsorID.');
                                  }
                              });
					                }
				       }
			     );
});

// Display a form that allows user to enter sponsor
app.get('/sponsor/add', function (req, res) {

        var responseHTML = htmlHeader;

        responseHTML += '<h1>Insert a sponsor</h1>' +
	'<form action="/sponsor/insert" method="GET">' +
	'<input type="hidden" name="sponsorID" id="sponsorID" />' +
	'<label for="sponsorName">Name</label> <input type="text" name="sponsorName" id="sponsorName" /><br />' +
	    '<label for="gearOffered">sponsor gear offered</label> <input type="text" name="gearOffered" id="gearOffered" /><br />' +
	'<input type="submit" /></form>';

        responseHTML += htmlFooter;
        res.send(responseHTML);
});

// Display a form that allows user to enter sponsor
app.get('/sponsor/insert', function (req, res) {

    var myQry = 'INSERT INTO Sponsor (sponsorName, gearOffered) VALUES (' +
	        '\'' + req.query.sponsorName + '\', ' +
	        '\'' + req.query.gearOffered + '\' ' +
	        ')';


        console.log(myQry);

        connection.query(myQry,
			      function (err, result) {
				           if (err) {
					                    handleError(res, err);
					                }
				           else {

					                    // are you querying the right thing?
					       console.log('SELECT * FROM Sponsor WHERE ' +
									                         'sponsorName= \'' + req.query.sponsorName + '\' and ' +
									                         'gearOffered=\'' + req.query.gearOffered + '\'');

					                    connection.query('SELECT * FROM Sponsor WHERE ' +
									                              'sponsorName= \'' + req.query.sponsorName + '\' and ' +
									                              'gearOffered=\'' + req.query.gearOffered + '\'',

									                                   function (err, result) {
                                  console.log(result);
													                                         if (err) {
                                      handleError(res, err);
                                  }
													                                         else if (result.length == 1) {
                                      res.send(buildUserViewFosponsor(result));
                                  }
													                                         else {
                                      res.send('No sponsor found for that sponsorID.');
                                  }
                              });
					                }
				       }
			     );
});

// method for deleting a sponsor record from the database.
app.get('/sponsor/delete', function (req, res) {

        var myQry = 'DELETE FROM Sponsor WHERE sponsorID=' + req.query.sponsorID;

        console.log(myQry);

        connection.query(myQry,
			      function (err, result) {
				           if (err) {
					                    handleError(res, err);
					                }
				           else {
					                    res.send('sponsor ID Number ' + req.query.sponsorID + ' successfully deleted.');
					                }
				       }
			     );
});


// HTML Example with data populated from the Location table

app.get('/Location/view/table', function (req, res) {

        var myQry = 'SELECT * FROM Location';

        console.log(myQry);

        connection.query(myQry,
			      function (err, result) {
				           if (err) {
					                    console.log(err);
					                    throw err;
					                    res.send('An error occured');

					                }
				           else {
					                    // Build the HTML table from the data in the Location table
					                    var responseHTML = '<h1>Table Example</h1>';
					                    responseHTML += '<table border=1>';
					                    responseHTML = responseHTML + '<tr><th>locationID Number</th><th>Name</th><th>More Info</th><th>Edit</th><th>Delete</th>';
					                    //Dynamic populating rows from the records returned
					                    for (var i = 0; i < result.length; i++) {
								                 responseHTML += '<tr><td>' + result[i].locationID + '</td>' +
								                                 '<td>' + result[i].physicalLocation + '</td>' +
								                                 '<td><a href="/Location/?locationID=' + result[i].locationID + '">more info</a>' +
								                                 '<td><a href="/Location/edit?locationID=' + result[i].locationID + '">edit</a>' +
								                                 '<td><a href="/Location/delete?locationID=' + result[i].locationID + '">delete</a></tr>'
								             }

					                    responseHTML += '</table>';
					                    res.send(responseHTML);
					                }
				       }
			     );
});

// Example of an HTML drop down menu with data from the Location table

app.get('/Location/view/dropdown', function (req, res) {

        var myQry = 'SELECT * FROM Location';

        console.log(myQry);

        connection.query(myQry,
			                      function (err, result) {
                         if (err) {
                             console.log(err);
			                                  throw err;
			                                  res.send('An error occured');

			                              }
						                           else {
									                                    // Build the HTML table from the data in the Location table
									                                    var responseHTML = '<h1>Drop Down Menu Example</h1>';
									                                    responseHTML += '<form method="GET" action="/Location/">';
									                                    responseHTML += 'Select a Location: <select name="locationID" id="locationID">';

									                                    //Dynamic populating rows from the records returned
									                                    for (var i = 0; i < result.length; i++) {
                                 responseHTML += '<option value="' + result[i].locationID + '">' + result[i].physicalLocation + '</option>';
                             }

									                                    responseHTML += '</select>';
									                                    responseHTML += '&nbsp;<input type="submit" />';
									                                    responseHTML += '</form>';
									                                    res.send(responseHTML);
                         }
                     }
			                  );
});

// Display information about a Location when given their locationID
app.get('/Location/', function (req, res) {

        var myQry = 'SELECT * FROM Location WHERE locationID=' + req.query.locationID;

    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
                         if (err) {
                             console.log(err);
			     throw err;
			     res.send('An error occured');
			     
			 }
			 else {
                             var responseHTML = htmlHeader + '<h1>Location Information</h1><br/>';
			     
			     //Dynamic populating rows from the records returned
			     for (var i = 0; i < result.length; i++) {
                                 responseHTML += '<ul><li>Name: ' + result[i].physicalLocation + '</li>' +
				     '<li>Hardest difficulty US : ' + result[i].hardestgradeUS + '</li>' +
				     '<li>Hardest difficulty Euro: ' + result[i].hardestgradeEuro + '</li>' +
				     '<li>notable route : ' + result[i].notableRoute + '</li>'
			     }
			     responseHTML += htmlFooter;
			     res.send(responseHTML);
                         }
                     }
		    );
});

// Display information about a Location when given their locationID and allow them to edit it.
app.get('/Location/edit', function (req, res) {

        var myQry = 'SELECT * FROM Location WHERE locationID=' + req.query.locationID;

        console.log(myQry);

        connection.query(myQry, function (err, result) {
        if (err) {
            handleError(res, err);
        }
	            else {

			            // Build the HTML table from the data in the Location table
			            var responseHTML = htmlHeader + '<h1>Edit Location Information</h1>';

			            responseHTML += '<form action="/Location/update" method="GET">';

			            //Dynamic populating rows from the records returned
			            if (result.length == 1) {

					                responseHTML += 'Name: <input type="text" name="physicalLocation" id="physicalLocation" value="' + result[0].physicalLocation + '" /><br />' +
					                        'notable route: <input type="text" name="notableRoute" id="notableRoute" value"' + result[0].notableRoute + '" /><br />' +
					                        'euro: <input type="text" name="hardestgradeEuro" id="hardestgradeEuro" value="' + result[0].hardestgradeEuro + '" /><br />' +
					                        'us: <input type="text" name="hardestgradeUS" id="hardestgradeUS" value="' + result[0].hardestgradeUS + '" /><br />' +
					                        '<input type="hidden" name="locationID" id="locationID" value="' + result[0].locationID + '" />' +
					                        '<input type="submit" /></form>' +
					                        htmlFooter;

					                res.send(responseHTML);
            }
			            else {
                res.send('More than one record was returned.')
            }
        }
    }
			     );
});

// Update a Location's fields given their locationID
app.get('/Location/update', function (req, res) {

        var myQry = 'UPDATE Location SET' +
	        ' physicalLocation=\'' + req.query.physicalLocation + '\', ' +
	        'hardestgradeEuro=\'' + req.query.hardestgradeEuro + '\', ' +
	        'hardestgradeUS=\'' + req.query.hardestgradeUS + '\', ' +
	        'notableRoute=\'' + req.query.notableRoute + '\' ' +
	        ' WHERE locationID=' + req.query.locationID;

        console.log(myQry);

        connection.query(myQry,
			      function (err, result) {
				           if (err) {
					                    handleError(res, err);
					                }
				           else {
					                    connection.query('SELECT * FROM Location WHERE locationID = ' + req.query.locationID,
									                                   function (err, result) {
                                  if (err) {
                                      console.log(err);
				                                            res.send('An error occurred');
                                  }
													                                         if (result.length == 1) {
                                      res.send(buildUserViewFoLocation(result));
                                  }
													                                         else {
                                      res.send('No Location found for that locationID.');
                                  }
                              });
					                }
				       }
			     );
});

// Display a form that allows user to enter Location
app.get('/Location/add', function (req, res) {

        var responseHTML = htmlHeader;

        responseHTML += '<h1>Insert a Location</h1>' +
	'<form action="/Location/insert" method="GET">' +
	'<input type="hidden" name="locationID" id="locationID" />' +
	'<label for="physicalLocation">Name</label> <input type="text" name="physicalLocation" id="physicalLocation" /><br />' +
	'<label for="hardestgradeUS">difficulty  us</label> <input type="text" name="hardestgradeUS" id="hardestgradeUS" /><br />' +
	'<label for="hardestgradeEuro">difficulty euro</label> <input type="text" name="hardestgradeEuro" id="hardestgradeEuro"><br />' +
	'<label for="notableRoute">notable route:</label> <input type="text" name="notableRoute" id="notableRoute" /><br />' +

    '<input type="submit" /></form>';

        responseHTML += htmlFooter;
        res.send(responseHTML);
});

// Display a form that allows user to enter Location
app.get('/Location/insert', function (req, res) {
    
    var myQry = 'INSERT INTO Location (physicalLocation, hardestgradeUS, hardestgradeEuro, notableRoute) VALUES (' +
	'\'' + req.query.physicalLocation + '\', ' +
	'\'' + req.query.hardestgradeUS + '\', ' +
	'\'' + req.query.hardestgradeEuro + '\', ' +
	'\'' + req.query.notableRoute + '\' ' +
	')';
    
    
    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
			 if (err) {
			     handleError(res, err);
			 }
			 else {
			     
			     // are you querying the right thing?
			     console.log('SELECT * FROM Location WHERE ' +
					 'physicalLocation= \'' + req.query.physicalLocation + '\' and ' +
					 'hardestgradeUS=\'' + req.query.hardestgradeUS + '\' and ' +
					 'hardestgradeEuro=\'' + req.query.hardestgradeEuro + '\' and ' +
					 'notableRoute=\'' + req.query.notableRoute + '\'');
			     
					                    connection.query('SELECT * FROM Location WHERE ' +
									     'physicalLocation= \'' + req.query.physicalLocation + '\' and ' +
									     'hardestgradeUS=\'' + req.query.hardestgradeUS + '\' and ' +
									     'hardestgradeEuro=\'' + req.query.hardestgradeEuro + '\' and ' +
									     'notableRoute=\'' + req.query.notableRoute + '\'',
									     
									     function (err, result) {
										 console.log(result);
										 if (err) {
										     handleError(res, err);
										 }
										 else if (result.length == 1) {
										     res.send(buildUserViewFoLocation(result));
										 }
										 else {
										     res.send('No location found for that locationID.');
										 }
									     });
					                }
		     }
		    );
});

// method for deleting a Location record from the database.
app.get('/Location/delete', function (req, res) {

        var myQry = 'DELETE FROM Location WHERE locationID=' + req.query.locationID;

        console.log(myQry);

        connection.query(myQry,
			      function (err, result) {
				           if (err) {
					                    handleError(res, err);
					                }
				           else {
					                    res.send('Location ID Number ' + req.query.locationID + ' successfully deleted.');
					                }
				       }
			     );
});





// skeleton for user view of html when interacting with table
function buildUserViewFoLocation(result) {

        // Build the HTML table from the data in the Location table
        var responseHTML = htmlHeader + '<h1>Location Information</h1>';

        //Dynamic populating rows from the records returned
        for (var i = 0; i < result.length; i++) {
        responseHTML += '<ul><li>Name: ' + result[i].physicalLocation + '</li>' +
		'<li>difficulty US : ' + result[i].hardestgradeUS + '</li>' +
		'<li>difficulty Euro: ' + result[i].hardestgradeEuro + '</li>' +
		
	    '<li>notable route : ' + result[i].notableRoute + '</li>' +
		'</ul>'
    }
        responseHTML += htmlFooter;
        //res.send(responseHTML);


        return responseHTML;
}

// skeleton for user view of html when interacting with table
function buildUserViewFoClimber_Sponsor(result) {

        // Build the HTML table from the data in the Climber_Sponsor table
        var responseHTML = htmlHeader + '<h1>Climber_Sponsor Information</h1>';

        //Dynamic populating rows from the records returned
        responseHTML += '<br />,<ul>';
        for (var i = 0; i < result.length; i++) {
        responseHTML += '<li>Name: ' + result[i].climberName + '</li>'
    }
        responseHTML += '</ul';
        responseHTML += htmlFooter;
        //res.send(responseHTML);


        return responseHTML;
}

// HTML Example with data populated from the Climber_Sponsor table

app.get('/Climber_Sponsor/view/table', function (req, res) {
    
    var myQry = 'SELECT Sponsor.sponsorID, sponsorName from Climber_Sponsor join Sponsor group by Sponsor.sponsorID, sponsorName;';
    
    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
			 if (err) {
			     console.log(err);
			     throw err;
			     res.send('An error occured');
			     
			 }
			 else {
			     // Build the HTML table from the data in the Climber_Sponsor table
			     var responseHTML = '<h1>Table Example</h1>';
			     responseHTML += '<table border=1>';
			     responseHTML = responseHTML + '<tr><th>Sponsor Name</th><th>More Info</th>';
			     //Dynamic populating rows from the records returned
			     for (var i = 0; i < result.length; i++) {
				 responseHTML += '<tr><td>' + result[i].sponsorName + '</td>' +
				     '<td><a href="/Climber_Sponsor/?sponsorID=' + result[i].sponsorID + '">more info</a>' 
			     }
			     
			     responseHTML += '</table>';
			     res.send(responseHTML);
			 }
		     }
		    );
});


// Display information about a Climber_Sponsor when given their relationID
app.get('/Climber_Sponsor/', function (req, res) {

    var myQry = 'select distinct Climber.climberName, relationID from Climber join Climber_Sponsor on Climber.climberID=Climber_Sponsor.climberID'
    myQry += '  and sponsorID=' + req.query.sponsorID;
    
    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
                         
			 console.log('printing result')
                         for (var el in result) {
                             console.log(el);
                         }
			 
			 if (err) {
                             console.log(err);
			     throw err;
			     res.send('An error occured');
			     
			 }
			 else {
			     var responseHTML = htmlHeader + '<h1>Which Climbers</h1><br/>';
			     
			     //Dynamic populating rows from the records returned
			     for (var i = 0; i < result.length; i++) {
				 responseHTML +=  result[i].climberName + '<br/>'
			     }
			     responseHTML += htmlFooter;
			     res.send(responseHTML);
                         }
                     }
		    );
});


// Display a form that allows user to enter Climber_Sponsor
app.get('/Climber_Sponsor/add', function (req, res) {

        var responseHTML = htmlHeader;

        responseHTML += '<h1>Insert a Climber_Sponsor</h1>' +
	'<form action="/Climber_Sponsor/insert" method="GET">' +
	'<input type="hidden" name="relationID" id="relationID" />' +
	'<label for="sponsorID">sponsorID</label> <input type="text" name="sponsorID" id="sponsorID" /><br />' +
	'<label for="climberID">climberID  </label> <input type="text" name="climberID" id="climberID" /><br />' +

    '<input type="submit" /></form>';

        responseHTML += htmlFooter;
        res.send(responseHTML);
});

// Display a form that allows user to enter Climber_Sponsor
app.get('/Climber_Sponsor/insert', function (req, res) {

        var myQry = 'INSERT INTO Climber_Sponsor (climberID, sponsorID) VALUES (' +
	         req.query.climberID  + ',' +
	         req.query.sponsorID  +
	        ')';


        console.log(myQry);

        connection.query(myQry,
			 function (err, result) {
			     if (err) {
				 handleError(res, err);
			     }
			     else {
				 
				 // are you querying the right thing?
				      console.log('SELECT * FROM Climber_Sponsor WHERE ' +
						  'climberID= ' + req.query.climberID + ' and ' +
						  'sponsorID=' + req.query.sponsorID );
				 
				 connection.query('SELECT * FROM Climber_Sponsor WHERE ' +
						  'climberID= ' + req.query.climberID + ' and ' +
						  'sponsorID=' + req.query.sponsorID,
						  
						  function (err, result) {
						      console.log(result);
						      if (err) {
							  handleError(res, err);
						      }
							   else if (result.length == 1) {
							       res.send('Insertion successful');
							   }
						      else {
							  res.send('Record already found.');
						      }
						  });
			     }
			 }
			);
});


// HTML Example with data populated from the Climber_Route table

app.get('/Climber_Route/view/table', function (req, res) {
    
    var myQry = 'SELECT DISTINCT Climber.climberName, Climber.climberID from Climber_Route join Climber on Climber_Route.climberID=Climber.climberID;';
    
    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
			 if (err) {
			     console.log(err);
			     throw err;
			     res.send('An error occured');
			     
			 }
			 else {
			     // Build the HTML table from the data in the Climber_Route table
			     var responseHTML = '<h1>Climbers</h1>';
			     responseHTML += '<table border=1>';
			     responseHTML = responseHTML + '<tr><th> Name</th><th>What Have They Climbed?</th></tr>';
			     //Dynamic populating rows from the records returned
			     for (var i = 0; i < result.length; i++) {
				 responseHTML += '<tr><td>' + result[i].climberName + '</td>' +
				     '<td><a href="/Climber_Route/?climberID=' + result[i].climberID + '">see their routes</a></td></tr>'
			     }

			     responseHTML += '</table>';
			     res.send(responseHTML);
			 }
		     }
		    );
});


// Displayall climbers that have done route
app.get('/Climber_Route/', function (req, res) {
    
    var myQry = 'select distinct Route.routeName, Route.routeID from Route join Climber_Route on Route.routeID=Climber_Route.routeID'
    myQry += ' and Climber_Route.climberID=' + req.query.climberID;
    
    console.log(myQry);
    
    connection.query(myQry,
		     function (err, result) {
			     console.log('printing result')
			     for (var el in result) {
				 console.log(el);
			     }
			 if (err) {
			     console.log(err);
			     throw err;
			     res.send('An error occured');
			     
			 }
			 else {
			     var responseHTML = htmlHeader + '<h1>Which Routes</h1><br/>';
			     
			     //Dynamic populating rows from the records returned
			     
			     for (var i = 0; i < result.length; i++) {
				 responseHTML += result[i].routeName + '</br>'
			     }
			     responseHTML += htmlFooter;
			     res.send(responseHTML);
			 }
		     }
		    );
});


// Display a form that allows user to enter Climber_Route
app.get('/Climber_Route/add', function (req, res) {
    
    var responseHTML = htmlHeader;
    
    responseHTML += '<h1>Insert a Climber_Route</h1>' +
	'<form action="/Climber_Route/insert" method="GET">' +
	'<input type="hidden" name="relationID" id="relationID" />' +
	'<label for="routeID">routeID</label> <input type="text" name="routeID" id="routeID" /><br />' +
	'<label for="climberID">climberID  </label> <input type="text" name="climberID" id="climberID" /><br />' +
	
    '<input type="submit" /></form>';
    
    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter Climber_Route
app.get('/Climber_Route/insert', function (req, res) {
    
    var myQry = 'INSERT INTO Climber_Route (climberID, routeID) VALUES (' +
	req.query.climberID  + ',' +
	req.query.routeID  +
	')';
    

    console.log(myQry);
    
    connection.query(myQry,
			 function (err, result) {
				  if (err) {
					                    handleError(res, err);
					   }
				           else {
					       
					       // are you querying the right thing?
					       console.log('SELECT * FROM Climber_Route WHERE ' +
									'climberID= ' + req.query.climberID + ' and ' +
									'routeID=' + req.query.routeID );
					       
					       connection.query('SELECT * FROM Climber_Route WHERE ' +
									     'climberID= ' + req.query.climberID + ' and ' +
									     'routeID=' + req.query.routeID,
									     
									     function (err, result) {
													       console.log(result);
													       if (err) {
																		     handleError(res, err);
																		 }
													       else if (result.length == 1) {
																		     res.send('Insertion successful');
																		 }
													       else {
																		     res.send('Record already found.');
																		 }
													   });
					   }
			      }
			);
});

// method for deleting a Climber_Route record from the database.
app.get('/Climber_Route/delete', function (req, res) {
    
    var myQry = 'DELETE FROM Climber_Route WHERE relationID=' + req.query.relationID;
    
    console.log(myQry);
    
    connection.query(myQry,
			 function (err, result) {
				  if (err) {
					       handleError(res, err);
					   }
				  else {
					       res.send('Climber_Route ID Number ' + req.query.relationID + ' successfully deleted.');
					   }
			      }
			);
});




// Begin listening

app.listen(...);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
