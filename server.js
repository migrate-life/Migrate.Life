
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

  function buildPlaces(){
    let url = `http://api.openweathermap.org/data/2.5/box/city?bbox=${regionBox.left},${regionBox.bottom},${regionBox.right},${regionBox.top},${regionBox.zoom}&APPID=${process.env.OPEN_WEATHER_API_KEY}`
    console.log('Line 42', url);
    let placesIdk = [];
    return superagent.get(url)
      .then(results => {
        placesIdk = results.body.list.map(data => (new Places(data)));
        // console.log(placesIdk);
        return placesIdk;
      })
      .catch(err => console.error(err));
  }

  function getStates(placesArray){
    let placesWithStates = placesArray.map(item => {
      let stateUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${item.name}&key=${process.env.GEOCODE_API_KEY}`;

      item.state = getState(stateUrl)
        .then(results => {
          // console.log('Line60',results)
          return results;
        })
      console.log('line 62', item)
      return item;
    })
    console.log('Line 63', placesWithStates);
    return placesWithStates;
  }

  function getState(url){
    return superagent.get(url)
      .then(placeRes => {
        let state = placeRes.body.results[0].address_components[placeRes.body.results[0].address_components.length - 2].long_name;
        // console.log('Line 73', state);
        return state;
      })
      .catch(() => console.log('this error sucks'));

  }


  buildPlaces()
    .then(array => {
      // console.log('line 72', array);
      let array2 = getStates(array)
      console.log(array2);
    })


  // superagent.get(url)
  //   .then(results => {
  //     results.body.list.forEach(data => placesIdk.push(new Places(data)));

  // return placesIdk.map(item => {
  //   let stateUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${item.name}&key=${process.env.GEOCODE_API_KEY}`;

  //   item.state = superagent.get(stateUrl)
  //     .then(placeRes => {
  //       let state = placeRes.body.results[0].address_components[placeRes.body.results[0].address_components.length - 2].long_name;
  //       console.log('Line 55', state);
  //       return state;
  //     })
  //     .catch(() => console.log('this error sucks'));

  //   console.log('Line 60', item.state);
  //   return item;
  // })
  //     .then((array) => {
  //       console.log('Line 66',array);
  //       response.render('pages/searches', {cities: array})
  //     })
  //   // console.log('Line 62', array);
  // })
  // .catch(err => console.error(err))
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


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
