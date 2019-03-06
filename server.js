'use strict';

//App depends
const express = require('express');
const superagent = require ('superagent');
const pg = require('pg');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;

// *** added ///
var parseString = require('xml2js').parseString;


require('dotenv').config();

//express app creation
const app = express();
app.use(express.urlencoded({extended:true}));

//EJS declaration
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', (request, response) => response.render('index'))


app.get('/search/:region', helperFunction);

// *** added ***
// app.get('/zillow', getZillowData);

// function Region() {
// }

function helperFunction (request, response) {
  let value = request.params.region;
  if(value === 'north') {
    var regionBox = {left:'-111.437624', bottom:'39.548000', right:'-84.919028', top:'48.473604', zoom:'6'}
  } else if(value === 'east') {
    var regionBox = {left:'-84.919028', bottom:'25.891349', right:'-68.528937', top:'42.368691', zoom:'6'}
  } else if(value === 'west') {
    var regionBox = {left:'-125.669681', bottom:'32.120673', right:'-111.437624', top:'48.473604', zoom:'6'}
  } else if(value === 'south') {
    var regionBox = {left:'-111.437624', bottom:'29.416872', right:'-84.919028', top:'39.548000', zoom:'6'}
  } else {
    response.render('pages/books/error')
  }

  let url = `http://api.openweathermap.org/data/2.5/box/city?bbox=${regionBox.left},${regionBox.bottom},${regionBox.right},${regionBox.top},${regionBox.zoom}&APPID=${process.env.OPEN_WEATHER_API_KEY}`

  let placesIdk = [];

  superagent.get(url)
    .then(results => {
      results.body.list.forEach(data => placesIdk.push(new Places(data)))
      response.render('pages/searches', {cities: placesIdk})
    })
    .catch(console.log('this is an error'))
}

//-------------------------------//
//-----CONSTRUCTOR FUNCTIONS-----//
//-------------------------------//

function Places(data) {
  this.name = data.name;
  this.latitude = data.coord.Lat;
  this.longitude = data.coord.Lon;
  this.temp = data.main.temp;
}


// function getZillowData (request, response) {

//   let url = `https://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=${process.env.ZILLOW_API_KEY}&state=wa&city=seattle&childtype=neighborhood`

//   superagent.get(url)
//     .then(results => {
//       console.log(results.text)
//       parseString(results.text, {explicitRoot: false}, function (err, result) {
//         // console.log(JSON.stringify(result));
//         console.log(result.response[0].list[0].region[0].name[0])
//         console.log(result.response[0].list[0].region[0].zindex[0]._)
//       });
//     })
//     .catch(console.log('line 81 - this is an error'))

// function preFab(data) {
//     this.   = data.  ;
//     this.   = data.  ;
//     this.   = data.  ;
//     this.   = data.  ;
// }

// function preFab(data) {
//     this.   = data.  ;
//     this.   = data.  ;
//     this.   = data.  ;
//     this.   = data.  ;
// }

// function preFab(data) {
//     this.   = data.  ;
//     this.   = data.  ;
//     this.   = data.  ;
//     this.   = data.  ;
// }

// function preFab(data) {
//     this.   = data.  ;
//     this.   = data.  ;
//     this.   = data.  ;
//     this.   = data.  ;
// }

// function whateverAPIwepick(query) {
//   const SQL = `SELECT FROM`;
//   const values = [query];

//   return clientInformation.query(SQL, values)
//     .then(result => {
//       if(result.rowCount > 0) {
//         console.log('from SQL');
//         return result.rows[0];
//       } else {
//         const url = `some feckin URL up in here`;

//         return superagent.get(url)
//           .then(data => {
//             console.log()

//             if (!data.body.results.length) { throw 'no Data'}

//             else {
//               let whateverWePick = new whateverAPIwepick(query, data.body.results[0]);
//               console.log();

//               let newSQL = `INSERT STUFF HERE FOR OUR NEW DB INFO;`;
//               console.log()
//               let newValues = Object.values(whateverwepick);
//               console.log()

//               return clientInformation.query(newSQL, newValues)
//                 .then(result => {
//                   console.log()
//                   //Attaches the id of the new record of instance
//                   // used to connect to other DBs
//                   console.log()
//                   whateverwepick.id = result.rows[0].id;
//                   return whatwepciked;
//                 })
//             }
//           })
//           .catch(error => console.log('Error in SQL Call'));
//       }
//     })

// }


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
