'use strict';

//App depends
const express = require('express');
const superagent = require ('superagent');
const pg = require('pg');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

//express app creation
const app = express();
app.use(express.urlencoded({extended:true}));

//EJS declaration
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', (request, response) => response.render('index'))


app.get('/search/:region', helperFunction);


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
  getPrices();
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

function Prices(data) {
  this.milk = data.prices[8].average_price;
  this.beer = data.prices[5].average_price;
  this.gas = data.prices[21].average_price;
  this.internet = data.prices[29].average_price;
}

// function preFab(data) {
//     this. = data.;
//     this. = data.;
//     this. = data.;
//     this. = data.;
// }

// function preFab(data) {
//     this. = data.;
//     this. = data.;
//     this. = data.;
//     this. = data.;
// }

function getPrices(city) {
  const url = `https://www.numbeo.com/api/city_prices?${process.env.NUMBEO_API_KEY}&query=${city.name}`;
  const prices = [];

  superagent.get(url)
    .then(data => {prices.push(new Prices(data))})
    .catch(error => console.log(error))
  return prices;
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
