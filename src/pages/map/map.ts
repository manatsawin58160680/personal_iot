import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import leaflet from 'leaflet';
import { CurrentWeatherPage } from '../current-weather/current-weather';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapContainer: ElementRef;
  private map: any;
  private all: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.all = this.navParams.get('coordinate');
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad MapPage');
    }

    ionViewDidEnter() {
      this.loadmap();
    }

    loadmap() {
      this.map = leaflet.map("map").fitWorld();
      leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
      }).addTo(this.map);
      this.map.locate({
        setView: true,
        maxZoom: 10
      }).on('locationfound', (e) => {
        let markerGroup = leaflet.featureGroup();
        let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
          alert(this.all);
        })
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);
        }).on('locationerror', (err) => {
          alert(this.all);
      })
    }

    pop_current(){
      this.navCtrl.pop();
    }

}
