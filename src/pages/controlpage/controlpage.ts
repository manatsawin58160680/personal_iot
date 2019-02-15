import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ControlpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-controlpage',
  templateUrl: 'controlpage.html',
})
export class ControlpagePage {
  private device = ['รดน้ำต้นไม้ในสวนผัก','ไฟ 1 สวนหลังบ้าน','ไฟ 2 สวนหน้าบ้าน'];
  private open; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlpagePage');
  }
change(){
  console.log(this.open);
  }
}
