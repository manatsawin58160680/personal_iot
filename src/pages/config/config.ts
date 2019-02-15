import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { Geolocation } from '@ionic-native/geolocation';
import { Geocoder } from '@ionic-native/google-maps';

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {
  private _user_config = localStorage.getItem("username");
  private _user_device;
  private Username_wifi
  private Password_wifi;
  private work_name;
  private user_regis;
  private Name_regis;
  private Username_regis;
  private Password_regis;
  showComp = false;

  data_device : {device_name : string,desciption: string,username_wifi: string,password_wifi : string}
= {
  device_name : '',
  desciption : '',
  username_wifi : '',
  password_wifi: ''
}

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider, public geolocation: Geolocation,
    public geocoder: Geocoder) {
      console.log();
    this.user_regis = this.navParams.get('user');
      console.log(this.user_regis);

    }

  regis_network() {
    this.showComp = !this.showComp;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }
  config_network() {
    this.geolocation.getCurrentPosition().then(res => {
      let geocoder = new google.maps.Geocoder();
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      this.go(latitude, longitude);
    });
  }
  go(latitude, longitude) {
    alert(this.Name_regis + this.Username_regis + this.Password_regis + this.work_name + this._user_device + latitude + longitude);
    // this.service.insert_device(this._user_config, this._user_device).subscribe((res) => { });
    // this.service.config_wifi(this.Username_wifi, this.Password_wifi).subscribe((res) => { });
    this.navCtrl.push(LoginPage);
  }
}
