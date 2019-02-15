import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ServiceProvider } from '../../providers/service/service';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the ModifilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modifile',
  templateUrl: 'modifile.html',
})
export class ModifilePage {
  private device_name;
  private New_device_name;
  private New_device_name_return;
  private device_work_name;
  private name_update;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public service: ServiceProvider,
    public popover: PopoverController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController) {
    this.name_update = localStorage.getItem('username');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifilePage');
    this.device_name = this.navParams.get('user');
    this.device_work_name = this.navParams.get('Device_work_name');

    console.log(this.device_work_name);
  }
  update() {
    if (this.New_device_name == undefined) {
      let alert = this.alertCtrl.create({
        title: 'คำเตือน',
        subTitle: 'กรูณากรอกชื่องาน',
        buttons: ['ยกเลิก']
      });
      alert.present();
    } else {
      this.service.update(this.New_device_name, this.device_name, this.name_update).subscribe((res) => {
        this.viewCtrl.dismiss(res);
      });
    }
  }
  return() {
    this.service.getdeviceby_username(this.name_update).subscribe((res) => {
      this.viewCtrl.dismiss(res);
    });
  }
}
