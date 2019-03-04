'use strict';

//App depends

const express = require('express');
const superagent = require ('superagent');
const pg = require('pg');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
require('dotenv').config();


app.get('/', loadHome)
//express app creation
const app = express();
app.use(express.urlencoded({extended:true}));

//EJS declaration
app.set('view engine', 'ejs');
app.use(express.static('./public'));


function loadHome(request, response) {
    let SQL = `SELECT * FROM locations;`;
    return client.query(SQL)
        .then(results => response.render('index', {results:results.rows}))
}


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
