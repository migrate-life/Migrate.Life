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


app.get('/search/:region', renderFunction);


//Helper functions

function getRegion(coord){
  if(coord === 'north') {
    return {left:'-111.437624', bottom:'39.548000', right:'-84.919028', top:'48.473604', zoom:'5'}
  } else if(coord === 'east') {
    return {left:'-84.919028', bottom:'25.891349', right:'-68.528937', top:'42.368691', zoom:'3'}
  } else if(coord === 'west') {
    return {left:'-125.669681', bottom:'32.120673', right:'-111.437624', top:'48.473604', zoom:'3'}
  } else if(coord === 'south') {
    return {left:'-111.437624', bottom:'29.416872', right:'-84.919028', top:'39.548000', zoom:'3'}
  }else{
    return false;
  }
}

async function getCities(regionBox) {

  let url = `http://api.openweathermap.org/data/2.5/box/city?bbox=${regionBox.left},${regionBox.bottom},${regionBox.right},${regionBox.top},${regionBox.zoom}&APPID=${process.env.OPEN_WEATHER_API_KEY}`

  let placesIdk = [];

  await superagent.get(url)
    .then(results => {
      results.body.list.forEach(data => placesIdk.push(new Places(data)))
      // console.log(placesIdk)
    })
    .catch(console.log('this is an error'))
  
  return placesIdk;
}

function priceUrl(city) {
  const url = `https://www.numbeo.com/api/city_prices?api_key=${process.env.NUMBEO_API_KEY}&query=${city.name}`;
  
  return superagent.get(url)
}

function getQuality(city){
  const url = `https://www.numbeo.com/api/indices?api_key=${process.env.NUMBEO_API_KEY}&query=${city.name}`
  
  return superagent.get(url)
}

function renderFunction(request, response) {
  let cities = [];
  let prices = [];
  let quality = [];

  let region = getRegion(request.params.region);
  getCities(region)
    .then(cities => {
      let getPrices = cities.map(city => new Promise((resolve,reject) => {
        resolve(priceUrl(city))
      }));

      Promise.all(getPrices)
        .then(values => {
          values.forEach(data => {
            prices.push(new Prices(data.body))
            console.log(prices);
          });
        })
        .catch(error => console.log(error))
    })
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

function Quality(data){
  this.health = data.health_care_index;
  this.property = data.property_price_to_income_ration;
  this.climate = data.climate_index;
}


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
