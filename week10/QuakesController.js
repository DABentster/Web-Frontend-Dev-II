import { getLocation } from './utilities.js';
import Quake from './quakes.js';
import QuakesView from './QuakesView.js';

// Quake controller
export default class QuakesController {
  constructor(parent, position = null) {
    this.parent = parent;
    this.parentElement = null;
    this.backButton = null;
    this.position = position || {
      lat: 0,
      lon: 0
    };
    this.quakes = new Quake();
    this.quakesView = new QuakesView();
  }
  async init() {
    this.parentElement = document.querySelector(this.parent);
    this.backButton = this.buildBackButton();
    await this.initPos();
    let radius = parseInt(this.getRadiusInputVal());
    document.getElementById('getQuakeBtn').addEventListener('click', e => {
          this.getQuakesByRadius()});
    this.getQuakesByRadius(radius);
  }
  async initPos() {
    if (this.position.lat === 0) {
      try {
        const posFull = await getLocation();
        this.position.lat = posFull.coords.latitude;
        this.position.lon = posFull.coords.longitude;
        //console.log(posFull);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getQuakesByRadius(radius = 100) {
    radius = parseInt(this.getRadiusInputVal());
    //set loading message
    this.parentElement.innerHTML = '<li>Loading...</li>';
    // get the list of quakes in the specified radius of the location
    const quakeList = await this.quakes.getEarthQuakesByRadius(
      this.position,
      radius
    );
    // render the list to html
    this.quakesView.renderQuakeList(quakeList, this.parentElement);
    this.backButton.classList.add('hidden');
    // add a listener to the new list of quakes to allow drill down in to the details
    this.parentElement.addEventListener('click', e => {
      this.getQuakeDetails(e.target.dataset.id);
    });
  }

  async getQuakeDetails(quakeId) {
    const quake = this.quakes.getQuakeById(quakeId);
    this.quakesView.renderQuake(quake, this.parentElement);
    this.backButton.classList.remove('hidden');
  }

  getRadiusInputVal() {
    let radiusInputVal = document.getElementById('radiusInput').value;
    return radiusInputVal;
  }

  buildBackButton() {
    const backButton = document.createElement('button');
    backButton.innerHTML = '&lt;- Back';
    backButton.addEventListener('click', () => {
        this.getQuakesByRadius();
    });
    backButton.classList.add('hidden');
    this.parentElement.before(backButton);
    return backButton;
  }
}

  