


const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();



app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


 



app.get('/heyapp', (req, res) =>{
	const longitude = req.query.longo
	const latitude = req.query.lato
	const curentlato = req.query.currentlat
	const db = new sqlite3.Database('./locations.db', (err) => {
	    if (err) {
		console.error("Erro opening database " + err.message);
	    } else {

		db.run('CREATE TABLE employees( \
		    employee_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
		    latitude INTEGER  NOT NULL,\
		    longitude INTEGER  NOT NULL,\
		    timestamp INTEGER,\
		    currentlong INTEGER,\
		    currentlat INTEGER\
		)', (err) => {
		    if (err) {
		        console.log("Table already exists.");
		    }
		    let insert = 'INSERT INTO employees (latitude, longitude, timestamp, currentlong, currentlat) VALUES (?,?,?,?,?)';
		    db.run(insert, [latitude, longitude, curentlato.timestamp, curentlato.coords.longitude, curentlato.coords.latitude]);


		});
	    }
	});
	console.log('alive')
	db.all("SELECT * FROM employees", function(err, rows) {  
	    rows.forEach(function (row) {  
		console.log(row);    // and other columns, if desired
	    })  
	});
	 
	res.send({test:'should work', hope:'at least onetime'})

})
app.get('/', (req, res) => {
  res.send('Hello World!')
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
