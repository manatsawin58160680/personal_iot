import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
 * Generated class for the WeatherHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weather-history',
  templateUrl: 'weather-history.html',
})
export class WeatherHistoryPage {

  constructor(private screenOrientation: ScreenOrientation,public navCtrl: NavController, public navParams: NavParams) {
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad WeatherHistoryPage');
    }

    getCurrentScreenOrientation(){
      console.log(this.screenOrientation.type);
    }

    async lockScreenOrientation(){
      try {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      } catch (error) {
        console.log(error);
      }
    }

    unlockScreenOrientation(){
      this.screenOrientation.unlock;
    }
    observeScreenOrientation(){
      this.screenOrientation.onChange()
        .subscribe(() => console.log("the application orentiation has changed"));
    }

}
