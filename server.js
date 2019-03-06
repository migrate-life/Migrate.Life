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

//Path handlers
app.get('/', (request, response) => response.render('index'))
app.get('/search/:region', helperFunction);

//Constructor functions
function Places(data) {
  this.name = data.name;
  this.latitude = data.coord.Lat;
  this.longitude = data.coord.Lon;
  this.temp = data.main.temp;
}

//Helper functions
function helperFunction (request, response) {
  let value = request.params.region;
  if(value === 'north') {
    var regionBox = {left:'-111.437624', bottom:'39.548000', right:'-84.919028', top:'48.473604', zoom:'3'}
  } else if(value === 'east') {
    var regionBox = {left:'-84.919028', bottom:'25.891349', right:'-68.528937', top:'42.368691', zoom:'3'}
  } else if(value === 'west') {
    var regionBox = {left:'-125.669681', bottom:'32.120673', right:'-111.437624', top:'48.473604', zoom:'3'}
  } else if(value === 'south') {
    var regionBox = {left:'-111.437624', bottom:'29.416872', right:'-84.919028', top:'39.548000', zoom:'3'}
  } else {
    response.render('pages/books/error')
  }

  let url = `http://api.openweathermap.org/data/2.5/box/city?bbox=${regionBox.left},${regionBox.bottom},${regionBox.right},${regionBox.top},${regionBox.zoom}&APPID=${process.env.OPEN_WEATHER_API_KEY}`

  let placesIdk = [];


  superagent.get(url)
    .then(results => {
      results.body.list.forEach(data => placesIdk.push(new Places(data)));
      placesIdk.forEach(function(item){
        let stateUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${item.name}&key=${process.env.GEOCODE_API_KEY}`;
        superagent.get(stateUrl)
          .then(placeRes => {
            item.state = placeRes.body.results[0].address_components[placeRes.body.results[0].address_components.length - 2].long_name;
          })
          .catch(() => console.log('this error sucks'))
      })
      return placesIdk;
    })
    .then(results => response.render('pages/searches', {cities: results}))
    .catch(console.log('this is an error'))
}


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
