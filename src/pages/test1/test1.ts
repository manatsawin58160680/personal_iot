import { Component } from '@angular/core';
import { NavController, Platform, AlertController, NavParams, LoadingController, Img } from 'ionic-angular';
import { PhonegapLocalNotification, LocalNotificationOptions } from '@ionic-native/phonegap-local-notification'
import { ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the Test1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-test1',
  templateUrl: 'test1.html',
})
export class Test1Page {

  private data_device_all_humid = [];
  private data_device_all = [];
  private data_device_all_temp = [{device_name: '',temperature: ''}];

  noti = {device_name: '', weather: '', value: 0, more_less: ''};
  humidity = [{device_name_humid: '', weather_humid: '', value_humid: 0, more_less: ''}];

  constructor(public localNotifications: LocalNotifications, 
    public loadingCtrl: LoadingController, 
    public service: ServiceProvider, 
    private toastCtrl: ToastController,
    public platform: Platform, 
    public navParam: NavParams, 
    public notification: PhonegapLocalNotification, 
    public navCtrl: NavController, 
    public alertCtrl: AlertController) {
    this.test1();
  }

    notification_test0(){
      let devices = [{id : 1,device : "ไปเปิดไฟให้หน่อยดิ่",value: 50},{ id : 2,device : "ปิดไฟตู้เย็นด่วน",value : 59 },{id : 3,device : "ยังอีก",value : 95}];
      let device_str = JSON.stringify(devices);
      let device_parse = JSON.parse(device_str);
        console.log(device_parse);
        for(let i in device_parse){
          if(device_parse[i].value > 0){
            console.log(device_parse[i].device +": "+ device_parse[i].value);
        }
      }  
    }

    notification_test(id,device,descprict) { 
      this.localNotifications.schedule([{
        id: id,
        text: device + ':' + descprict,
        led: 'FF0000',
        icon: '/assets/imgs/logo.png'
        }]);
    }

    test1() {
      this.service.getdeviceby_username("ong44").subscribe((res) => {
        // get device_by username
        this.service
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
                    
                    console.log(temp[0]);

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

      ionViewDidLoad() {
        console.log('ionViewDidLoad Test1Page');
      }
  
}


