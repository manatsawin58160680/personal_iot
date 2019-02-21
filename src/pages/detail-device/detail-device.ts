import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the DetailDevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-device',
  templateUrl: 'detail-device.html',
})
export class DetailDevicePage {

  //select -> weather data
  private device_key;
  private device_name;

  //weather current 
  private weather;
  private weather_temp;
  private weather_humid;
  private weather_light;
  private weather_pressure;
  private weather_date;
  private weather_time;
  private weather_rssi;
  private weather_name;
  private weather_falenhigh;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public service: ServiceProvider) {

    this.device_key = this.navParams.get('device_key');
    this.device_name = this.navParams.get('device_name');

    this.select_weather_data();
  }

    ionViewDidLoad() {
      console.log('your stay at Detailpage');
    }

    select_weather_data(){
      let username = localStorage.getItem('username');
        this.service.getlast_data_sensor(username, this.device_key).subscribe((res) => {
          this.weather = res[0];
          this.weather_temp = this.weather.temperature;
          this.weather_falenhigh = (1.8 * this.weather.temperature)+32;
          this.weather_humid = this.weather.humidity;
          this.weather_light = this.weather.light;
          this.weather_pressure = this.weather.pressure; 
          this.weather_date = this.weather.date;
          this.weather_time = this.weather.time;
          this.weather_name = this.weather.device_name;
          this.weather_rssi = this.weather.rssi;
        });
    }

    back_to_dashboard(){
      this.navCtrl.pop();
    }
}
