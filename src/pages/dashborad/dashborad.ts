import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DashboradPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashborad',
  templateUrl: 'dashborad.html',
})
export class DashboradPage {

    public check_data_account = 0;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad DashboradPage');
    }

    showDataAccount(){
      if(this.check_data_account==0){
      this.check_data_account ++;
      }else{
        this.check_data_account --;
      }
    }


}
