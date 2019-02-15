import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { CurrentWeatherPage } from '../current-weather/current-weather';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  page1: any = CurrentWeatherPage;

  constructor(public navCtrl: NavController,public navParams:NavParams) {
    let a = this.navParams.get("username");
    
  }
  clear(){
    localStorage.clear();
  }
}
