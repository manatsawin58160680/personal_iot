import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { ServiceProvider } from '../../providers/service/service'
import { Jsonp } from '@angular/http';
import { ProfilePage } from '../profile/profile';
import { CurrentWeatherPage } from '../current-weather/current-weather';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DashboradPage } from '../dashborad/dashborad';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class LoginPage {

  private Realtime: string;
  private Username;
  private Password;
  private name;


  email: string;
  password: string;

  private test: {
    username: string,
    password: string
  };

  account: { username: string, password: string } = {
    username: '',
    password: ''
  };

  userData = {
    Username: this.Username,
    Password: this.Password
  };

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  private todo: FormGroup;
  // private username: string[];
  // private password: string[];
  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: ServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder) {

    this.todo = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


    this.menuCtrl.enable(false);

    let getname_storage = localStorage.getItem("username");
    let getpass_storage = localStorage.getItem("password");
    if (localStorage.getItem("username")) {
      this.navCtrl.push(CurrentWeatherPage, {
        username: getname_storage,
        password: getpass_storage
      });
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  logForm() {
    console.log(this.todo.value);
  }

  startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);
    this.Realtime = h + ":" + m + ":" + s;
    var t = setTimeout(this.startTime, 500);
  }

  checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
  }

  ionViewDidLoad() {
  }

  go_regispage() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    alert(this.account.username);

    console.log(this.account.username);

    this.service.select_userall().subscribe((res) => { 
      console.log(res);

      let username_all = [];
      let password_all = [];

      for (let e in res) {
        username_all[e] = res[e].username;
        password_all[e] = res[e].password;
      }
      this.find_user(//function 
        username_all,
        this.account.username,
        password_all,
        this.account.password
      );
    });
  }

  find_user(username_all, Username,
    password_all, Password) {
    var found_user = username_all.find(function (element) {
      return element == Username;
    });
    var found_password = password_all.find(function (element) {
      return element == Password;
    });
    if (Username == undefined) {
      let alert = this.alertCtrl.create({
        title: 'คำเตือน',
        subTitle: 'กรุณากรอกชื่อผู้ใช้',
        buttons: ['ตกลง']
      });
      alert.present();
    }
    else if (Password == undefined) {
      let alert = this.alertCtrl.create({
        title: 'คำเตือน',
        subTitle: 'กรุณากรอกรหัสผ่าน',
        buttons: ['ตกลง']
      });
      alert.present();
    } else if (Boolean(found_user) == false) {
      let alert = this.alertCtrl.create({
        title: 'คำเตือน',
        subTitle: 'ไม่พบชื่อผู้ใช้ในระบบ',
        buttons: ['ตกลง']
      });
      alert.present();
    }
    else if (Boolean(found_user) == true && Boolean(found_password) == true) {
      localStorage.setItem("username", Username);
      localStorage.setItem("password", Password);
      this.service.select_login(Username, Password).subscribe((res) => {
        let a = res[0].name;
        localStorage.setItem('Name', a);
      });
      let loading = this.loadingCtrl.create({
        content: 'เข้าระบบสำเร็จ'
      });

      loading.present();
      setTimeout(() => {
        this.navCtrl.push(CurrentWeatherPage);
      }, 1000);

      setTimeout(() => {
        loading.dismiss();
      }, 3000);
    } else if (Boolean(found_user) == true && Boolean(found_password) == false) {
      let alert = this.alertCtrl.create({
        title: 'คำเตือน',
        subTitle: 'รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง',
        buttons: ['ตกลง']
      });
      alert.present();
    }
    else if (Boolean(found_user) == false && Boolean(found_password) == false) {
      let alert = this.alertCtrl.create({
        title: 'คำเตือน',
        subTitle: 'ชื่อผู้ใช้และรหัสผ่านผิด กรุณาสมัครสมาชิกด้วยนะไอ้ชาติหมา',
        buttons: ['ตกลง']
      });
      alert.present();
    }
  }

}
// this.navCtrl.push(TabsPage);