// import { getJSON, getLocation } from './utilities.js';
import QuakesController from './QuakesController.js';

// const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';

// async function testGetQuakesForLocation() {
//     let coord = await getLocation();
  
//     // use that information to build out the correct URL
//     const geoUrl = baseUrl + coord;
//     // use the url to request the correct quakes 
    
//     // getJSON(geoUrl);
//     let JSON = getJSON(baseUrl);
//     //log out the quakes for now.
//     return JSON;
//   }
//   testGetQuakesForLocation();

let quakeController = new QuakesController('#quakeList');
quakeController.init();