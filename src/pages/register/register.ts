import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { ServiceProvider } from '../../providers/service/service'
import { ConfigPage } from '../config/config';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private Name_regis;
  private Username_regis;
  private Password_regis;
  private Device_name;
  private Detail;
  private Username_wifi;
  private Password_wifi;
  // validation form regis
  register_form:  FormGroup;
  
  //object 
  register: {name: string,surname : string,username: string,password: string,email:string,phone : string, confirm_password : string} = {
    name : 'John',
    surname : 'Mactomine',
    username : 'boat',
    password : '123456',
    email : 'a@Aaaa',
    phone : '0830478320',
    confirm_password : '123456'
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public service: ServiceProvider,
    private formBuilder: FormBuilder) {

      this.register_form = this.formBuilder.group({
        name: ['',Validators.compose([Validators.required])],
        surname: ['',Validators.compose([Validators.required])],
        username: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{10}')])],
        confirm_password: ['', Validators.compose([Validators.required])]
      });

  }

    ionViewDidLoad() {

      console.log('ionViewDidLoad RegisterPage');
    }

    go_weanning() {
      let alert = this.alertCtrl.create({
        title: 'คำเตือน',
        subTitle: 'ใส่ข้อมูลให้ครบนะครับ',
        buttons: ['ยกเลิก']
      });
      alert.present();
    }


    next_config() {
      this.service.select_userall().subscribe((res) => {
        let username_all = [];
        for (let e in res) {
          username_all[e] = res[e].Username;

        }
        this.find_user_regis(username_all, this.Username_regis);
      });
    }

    find_user_regis(username_all, Username_regis) {
      var found_user = username_all.find(function (element) {
        return element == Username_regis;
      });
      if (Boolean(found_user) == true) {
        let alert = this.alertCtrl.create({
          title: 'คำเตือน',
          subTitle: 'ชื่อผู้ใช้นี้อยู่ในระบบนี้แล้ว',
          buttons: ['ตกลง']
        });
        alert.present();
      } 
      else if(this.register.password != this.register.confirm_password){
        let alert = this.alertCtrl.create({
          title: 'คำเตือน',
          subTitle: 'รหัสผ่านไม่ตรงกัน',
          buttons: ['ตกลง']
        });
        alert.present();
      }
      else {
        console.log(this.register);
       this.service.register(this.register);
       this.navCtrl.pop();
      }
      this.service.config_wifi(this.Username_wifi, this.Password_wifi).subscribe((res) => { });
      let loading = this.loadingCtrl.create({
      content: 'รอสักครู่ กำลังดำเนินการ'
      });

      loading.present();

      setTimeout(() => {
      this.navCtrl.push(LoginPage);
       }, 10000);

      setTimeout(() => {
      loading.dismiss();
     }, 3000);
    }
}








