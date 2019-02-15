import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  private New_user_name;
  private name;
  constructor(public viewCtrl: ViewController,public navCtrl: NavController,public alertCtrl: AlertController,public service: ServiceProvider) {
    this.name = localStorage.getItem('username');
   }
  update(){
    if(this.New_user_name == undefined){
      let alert = this.alertCtrl.create({
        title: 'คำเตือน',
        subTitle: 'กรูณากรอกชื่อผู้ใช่ที่จะแก้ไข',
        buttons: ['ยกเลิก']
      });
      alert.present();
    }else{
      this.service.update_name(this.New_user_name,this.name).subscribe((res)=>{
        this.viewCtrl.dismiss(res[0]);
      });
    }
  }
}
