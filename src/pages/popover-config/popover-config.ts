import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the PopoverConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-config',
  templateUrl: 'popover-config.html',
})
export class PopoverConfigPage {
  private name_work;
  private name_device;
  private name_wifi;
  private pass_wifi;
  constructor(public viewCtrl : ViewController,public service: ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverConfigPage');
  }
  add(){
    let username = localStorage.getItem('username');
    this.service.insert_device(username,this.name_device,this.name_work).subscribe((res)=>{
      this.viewCtrl.dismiss(res);
    });
  
  }
  cancle(){

  }
}
