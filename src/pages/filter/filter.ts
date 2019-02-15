import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { SelectSearchableComponent } from 'ionic-select-searchable';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  @ViewChild('myselect') selectComponent: SelectSearchableComponent;
  user = null;
  userIds = [];

  users = [
    {
      id:0,
      name: 'boatza',
      country: 'thai'

    },
    {
      id:1,
      name: 'aong',
      country: 'thai'

    },
    {
      id:2,
      name: 'manatsawin',
      country: 'thai'

    }
  ];
  private pepperoni;
  private filter_device_name = [];
  private value = [];
  private filter_device_work_name = [];
  filter_service_all: any;
  private filter_device;
  

  constructor(public toastCtrl:ToastController,public viewCtrl: ViewController,public service:ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    let username = localStorage.getItem('username');
    this.service.getdeviceby_username(username).subscribe((res)=>{
      this.filter_service_all = res;
      for(let i in res){
        this.filter_device_name[i] = this.filter_service_all[i].Device_name;
        this.filter_device_work_name[i] = this.filter_service_all[i].Device_work_name; 
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }
  a(){
    console.log(this.filter_device);
  }


  userChanged(event: {component: SelectSearchableComponent, value: any}){
    //user selected
    console.log('event: ', event);
  }
  onClose(){
    let toast = this.toastCtrl.create({
      message: 'thanks for your selection',
      duration: 2000
    });
    toast.present();
  }
  openFromCode(){
    this.selectComponent.open();
  }
}
