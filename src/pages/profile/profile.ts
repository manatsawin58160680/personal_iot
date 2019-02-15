import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController, AlertController, ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { LoginPage } from '../login/login';
import { ModifilePage } from '../modifile/modifile';
import { ContactPage } from '../contact/contact';
import { PopoverConfigPage } from '../popover-config/popover-config';
import { empty } from 'rxjs/Observer';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import { NotificationPage } from '../notification/notification';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private place_profile;
  private type_profile;


  private _username;
  private _password;
  private _name;
  private _email;
  private data_device_all = [];
  private data_device_all_temp = [];
  private data_device_all_humid = [];
  private data_device_all_date = [];
  private data_device_all_time = [];
  private data_device_all_name = [];
  value1 = false;
  private _user_device_name = [];
  showComp = false;
  showComp1 = false;
  private verygood_rssi = false;
  private good_rssi;
  private false_rssi;
  private user_name: any;
  private name_work;
  private name_device;
  count_all: any;
  data: any;

  constructor(public service: ServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public popover: PopoverController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private hotspot: Hotspot,
    public modalCtrl: ModalController) {

    // this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
    //   this.data = networks;
    //   console.log(".........hotspot..........", JSON.stringify(networks));
    // });

    this._username = localStorage.getItem("username");
    this._password = localStorage.getItem("password");

    this.service.select_login(this._username, this._password).subscribe((res) => {
      this._name = res;
    });
    this.service.getdeviceby_username(this._username).subscribe((res) => {
      for (let i in res) {
        this.count_all = parseInt(i) + 1;
      }
      this._user_device_name = res;
    });

    // this.select();
  }// constucter

  select_place() {
    this.service.select_devices(this.place_profile).subscribe((res) => {
      console.log(res);
      console.log(res[0].device_description);
      for (let j in res) {
        this.data_device_all[j] = res[j];
        this.data_device_all_time[j] = this.data_device_all[j].device_description;
        this.data_device_all_name[j] = this.data_device_all[j].type_of_iot;
      }
      console.log(this.data_device_all_name);
    });
  }

  select_type() {
    this.data_device_all = [];
    this.data_device_all_time = [];
    this.data_device_all_name = [];
    this.service.select_devices_type(this.place_profile,this.type_profile).subscribe((res) => {
      for (let j in res) {
        this.data_device_all[j] = res[j];
        this.data_device_all_time[j] = this.data_device_all[j].device_description;
        this.data_device_all_name[j] = this.data_device_all[j].type_of_iot;
      }
      console.log(this.data_device_all_name);
    });
  } 
  add_device(myEvent) {
    let popover = this.popover.create(PopoverConfigPage);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      this._user_device_name = data;
    });
  }

  clear() {
    localStorage.clear();
    let loading = this.loadingCtrl.create({
      content: 'กำลังออกจากระบบ'
    });
    loading.present();
    setTimeout(() => {
      this.navCtrl.push(LoginPage);
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  Delete(device_name) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบข้อมูล',
      message: 'แน่ใจหรือเปล่าว่ะจะลบอ้ะ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'ยกเลิก',
          handler: () => {
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'กำลังลบข้อมูล'
            });

            loading.present();
            setTimeout(() => {
              this._username = localStorage.getItem("username");
              this.service.delete(device_name, this._username).subscribe((res) => {
                for (let i in res) {
                  this.count_all = parseInt(i) + 1;
                }
                console.log(this.count_all);
                this._user_device_name = res;
              });
            }, 1000);
            setTimeout(() => {
              loading.dismiss();
            }, 2000);
          }
        }
      ]
    });
    alert.present();
  }

  setting_name(myEvent) {
    let popover = this.popover.create(ContactPage);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      this._name = data.Name;
    });
  }

  setting() {
    this.showComp = !this.showComp;
  }

  setting1() {
    this.showComp1 = !this.showComp1;
  }

  add() {
    let loading = this.loadingCtrl.create({
      content: 'กำลังเพิ่มข้อมูลและตั้งค่าเครือข้่าย.. กรุณารอสักครู่'
    });
    loading.present();
    setTimeout(() => {
      let username = localStorage.getItem('username');
      this.service.insert_device(username, this.name_device, this.name_work).subscribe((res) => {
        this._user_device_name = res;
        for (let i in res) {
          this.count_all = parseInt(i) + 1;
        }
        // this.select();
      });
      this.showComp1 = false;
    }, 1000);
    setTimeout(() => {
      loading.dismiss();
    }, 10000);
  }

  modifile(myEvent, device_name, Device_work_name) {
    console.log(Device_work_name);
    let popover = this.popover.create(ModifilePage,
      {
        user: device_name,
        Device_work_name: Device_work_name
      });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      this._user_device_name = data;
    });
  }

  // select() {
  //   let username = localStorage.getItem("username");
  //   this.service.getdeviceby_username(username).subscribe((res_value) => {
  //     let data_device = res_value;

  //     for (let j in data_device) {
  //       this.service.getlast_data_sensor(username, data_device[j].device_name).subscribe((res) => {
  //         this.data_device_all[j] = res[0];
  //         this.data_device_all_time[j] = this.data_device_all[j].Rssi;
  //         this.data_device_all_name[j] = this.data_device_all[j].Device_work_name;
  //       });
  //     }
  //   });
  // }

  notification(Device_name, Device_work_name) {
    console.log(Device_name);
    let profileModal = this.modalCtrl.create(NotificationPage,
      {
        Device_name: Device_name,
        Device_work_name: Device_work_name
      });
    profileModal.present();
  }

  cancle() {
    this.showComp1 = false;
  }

  ionViewDidLoad() {

  }
}

