import { Component } from '@angular/core';
import { NavController, Platform, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';



/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  private thermometer = 20;
  private brightness = 0;

  private notifi: boolean = true;
  private toggle: Boolean = true;
  showComp = false;
  toggle_noti = true;
  status_k : Boolean = true;

  private select_weather;
  private detail_textarea;
  private value1;
  private oparetion;

  brightnesss = [];

  private at = [];
  private weather = [];
  detail_textareas = [];
  oparetions = [];
  notifi_data = [];
  notifi_id = [];
  N_status = [];
  status: any;
  status_t = ['1','2','3'];
  device_work_name: any;
  device_name: any;

  private color = "red";
  constructor(public loadingCtrl:LoadingController,
    public service: ServiceProvider, 
    private toastCtrl: ToastController, 
    public platform: Platform, 
    public navParam: NavParams, 
    public navCtrl: NavController, 
    public alertCtrl: AlertController) {

    this.device_name = this.navParam.get('Device_name');
    this.device_work_name = this.navParam.get('Device_work_name');

    this.card_notification();
    
  }

    setting() {
      this.showComp = !this.showComp;
    }
    
    check_value() {
      if (this.select_weather == undefined) {
        let toastCtrl = this.toastCtrl.create({
          message: 'กรุณาเลือกข้อมูลจากตัวเลือก',
          duration: 3000,
          position: 'top'
        });
        toastCtrl.present();
      }
      this.showComp = false;
      this.service.Add_Notification(this.device_name, 
        this.select_weather, 
        this.oparetion, 
        this.brightness, 
        this.detail_textarea).subscribe((res) => { 
          this.card_notification();
        });
      
    }

    card_notification(){
      this.service.Select_Notification(this.device_name).subscribe((res) => {
        this.notifi_data = res;
        for (let i in this.notifi_data) {
          this.notifi_id[i] = this.notifi_data[i].notification_id;
          this.weather[i] = this.notifi_data[i].notification_weather;
          this.oparetions[i] = this.notifi_data[i].notification_operator;
          this.detail_textareas[i] = this.notifi_data[i].notification_description;
          this.brightnesss[i] = this.notifi_data[i].notification_value;
          this.N_status[i] = this.notifi_data[i].notification_status;
        }
      });
    }

    toggle_notifi(event,notification_id){
      let status;
      if(event.checked == true){
        status = 'true';
        this.service.notification_status(notification_id,status).subscribe((res)=>{});
        this.card_notification();
      }
      else if(event.checked == false){
        status = 'false';
        this.service.notification_status(notification_id,status).subscribe((res)=>{});
        this.card_notification();
      } 
    }
    
    Delete(Notifi_id) {
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
                this.service.Delete_notifi(Notifi_id,this.device_name).subscribe((res)=>{});
               
              }, 1000);
              setTimeout(() => {
                loading.dismiss(); 
                this.card_notification();
              }, 2000);
            }
          }
        ]
      });
      alert.present();
    }

    modifile_notification(FF){
        console.log(FF);        
    }

    back_current(){
      this.navCtrl.pop();
    }
}