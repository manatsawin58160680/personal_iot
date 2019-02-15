import { Component, ViewChild } from '@angular/core';
import { Platform, Icon, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ConfigPage } from '../pages/config/config';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Nav } from 'ionic-angular';
import { ServiceProvider } from '../providers/service/service'
import { ToastController } from 'ionic-angular';
import { Test1Page } from '../pages/test1/test1';
import { CurrentWeatherPage } from '../pages/current-weather/current-weather';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { WeatherHistoryPage } from '../pages/weather-history/weather-history';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AddDevicePage } from '../pages/add-device/add-device';
import { DashboradPage } from '../pages/dashborad/dashborad';
import { NotificationPage } from '../pages/notification/notification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, icon: string }>;

  private username_sidemenu;
  private pass_sidemenu;
  private thermometer = 21;

  constructor(private toastCtrl: ToastController,
    public service : ServiceProvider,
    public loadingCtrl:LoadingController,
    public alertCtrl: AlertController, 
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public localNotifications: LocalNotifications,
    public menuCtrl : MenuController) {

    this.initializeApp();
    this.username_sidemenu = localStorage.getItem('Name');
    this.pass_sidemenu = localStorage.getItem('password');

    setInterval(() => { 
       this.Condition_notification();
     }, 15000);

    this.pages = [
      { title: 'Dashborad', component: DashboradPage, icon: "phone-portrait" },
      { title: 'Description device', component: CurrentWeatherPage, icon: "sunny"},
      { title: 'Manage Personal', component: ProfilePage, icon: "people"},
      { title: 'Notification', component: NotificationPage, icon: "notifications"},
      { title: 'History Weather', component: WeatherHistoryPage, icon: "trending-up"}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
    initializeApp() {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }

    openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    }

    profile() {
      this.nav.setRoot(ProfilePage);
    }

    logout() {
      let alert = this.alertCtrl.create({
        title: 'ยืนยันการลบข้อมูล',
        message: 'เเน่ใจหรอว่าจะออกจากระบบ',
        buttons: [{
            text: 'ยกเลิก',
            role: 'ยกเลิก',
            handler: () => {
            }
          },{
              text: 'ตกลง',
              handler: () => {
                localStorage.clear();
                let loading = this.loadingCtrl.create({
                  content: 'กำลังออกจากระบบ'
                });
                loading.present();
                setTimeout(() => {
                  this.nav.setRoot(LoginPage);
                  this.menuCtrl.enable(false);
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
   
    notification_test(id,device,descprict) { 
      this.localNotifications.schedule([{
        id: id,
        text: device + ':' + descprict,
        led: 'FF0000',
        icon: '/assets/imgs/logo.png'
        }]);
    }
    
    Condition_notification(){
      if (localStorage.getItem("username")) {
        this.test1();
      }
    }
    
    
    test1() {
      let username = localStorage.getItem('username');
      this.service.select_noti_device(username).subscribe((res) => {
        // get device_by username
        let device;
        for (let g in res) {
          device = res[g].device_name;
            this.service.notification_compare(device).subscribe((notification) => {

              console.log(notification[0].device_name);
              
              let obj = notification;
              let temp = [];
              let humidity = [];
              for (let i in obj) {
                    if (obj[i].notification_weather == "อุณหภูมิ") {
                      temp[i] = obj[i];
                    } else if (obj[i].notification_weather == "ความชื้น") {
                      humidity[i] = obj[i];
                    }
                  }
                    temp.indexOf('empty') !== -1 && temp.splice(temp.indexOf('empty'), 1)
                    temp = temp.filter(e => e !== 'empty')

                    humidity.indexOf('empty') !== -1 && humidity.splice(humidity.indexOf('empty'), 1)
                    humidity = humidity.filter(e => e !== 'empty')

                    let device_name_follow_key = notification[0].device_name;

                    this.service.getlast_data_sensor("ong44", device_name_follow_key).subscribe((arrays) => {
                      let temp_sensor = arrays[0].Temperature;
                      let humid_sensor = arrays[0].Humidity;
                        for (let i in temp) {
                          if (temp[i].notification_weather == "อุณหภูมิ" && temp[i].notification_operator == "มากกว่า") {
                            if (temp_sensor > temp[i].notification_value) {
                              console.log(temp[i].device_name + "อุณหภูมิมากกว่า" + temp[i].notification_value + ":" + temp[i].notification_description);  
                              this.notification_test(temp[i].notification_id,temp[i].device_description,temp[i].notification_description);
                              // alert(temp[i].notification_id);
                            }
                          }
                          else if (temp[i].notification_weather == "อุณหภูมิ" && temp[i].notification_operator == "น้อยกว่า") {
                            if (temp_sensor < temp[i].notification_value) {
                              console.log(temp[i].device_name + "อุณหภูมิน้อยกว่า" + temp[i].notification_value + ":" + temp[i].notification_description);
                              this.notification_test(temp[i].notification_id,temp[i].device_description,temp[i].notification_description);
                            }
                          }
                        }
                        for (let j in humidity) {
                          if (humidity[j].notification_weather == "ความชื้น" && humidity[j].notification_operator == "มากกว่า") {
                            if (humid_sensor > humidity[j].notification_value) {
                              console.log(humidity[j].device_name + "ความชื้นมากกว่า" + humidity[j].notification_value + ":" + humidity[j].notification_description);
                              this.notification_test(humidity[j].notification_id,humidity[j].device_description,humidity[j].notification_description);
                            }
                          }
                          else if (humidity[j].notification_weather == "ความชื้น" && humidity[j].notification_operator == "น้อยกว่า") {
                            if (humid_sensor < humidity[j].notification_value) {
                              console.log(humidity[j].device_name + "ความชื้นน้อยกว่า" + humidity[j].notification_value + ":" + humidity[j].notification_description);
                              this.notification_test(humidity[j].notification_id,humidity[j].device_description,humidity[j].notification_description);
                            }
                          }
                        }
                    });
                });
            }
        });
      }
}
