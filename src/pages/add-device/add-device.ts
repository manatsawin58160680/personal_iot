import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import { ServiceProvider } from '../../providers/service/service';
import { LoadingController, PopoverController, AlertController, ModalController } from 'ionic-angular';
import { CurrentWeatherPage } from '../current-weather/current-weather';

/**
 * Generated class for the AddDevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-device',
  templateUrl: 'add-device.html',
})
export class AddDevicePage {
  
  typedevice = ['NB-IoT','NodeMCU'];
 

  device : {device_name: string, device_description: string} = {
    device_name : '',
    device_description : ''
  }
  
  wifi : {wifi_username : string,wifi_password : string} = {
    wifi_username : '',
    wifi_password : ''
  }
  
  device_form:  FormGroup;
  device_wifi: FormGroup;
  device_all: FormGroup;
  
  data:any;
  private device_type = 0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder : FormBuilder,private hotspot: Hotspot, public service : ServiceProvider,public loadingCtrl: LoadingController) {
    
    this.device_form = this.formBuilder.group({
      device_name: ['',Validators.compose([Validators.required])],
      device_description: ['',Validators.compose([Validators.required])]
    });

    this.device_wifi = this.formBuilder.group({
      device_name: ['',Validators.compose([Validators.required])],
      device_description: ['',Validators.compose([Validators.required])],
      wifi_username: ['', Validators.compose([Validators.required])],
      wifi_password: ['', Validators.compose([Validators.required])]
    });
        
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.data=networks;
      console.log(".........hotspot..........",JSON.stringify(networks));
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDevicePage');
  }

  test1(value){
      this.device_type = value;
      console.log(this.device_type);
  }
  add() {
    let count_all:any ;
    let loading = this.loadingCtrl.create({
      content: 'กำลังเพิ่มข้อมูลและตั้งค่าเครือข้่าย.. กรุณารอสักครู่'
    });
    loading.present();
    setTimeout(() => {
      let username = localStorage.getItem('username');
      this.service.config_wifi(this.wifi.wifi_username, this.wifi.wifi_password).subscribe((res) => { });
      this.service.insert_device(username, this.device.device_name, this.device.device_description).subscribe((res) => {});
    }, 1000);
    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.push(CurrentWeatherPage);
    }, 10000);
  }

  back_current(){
    this.navCtrl.pop();
  }
}
