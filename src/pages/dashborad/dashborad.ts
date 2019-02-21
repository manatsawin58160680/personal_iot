import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import {DetailDevicePage } from '../detail-device/detail-device';
import { Test1Page } from '../test1/test1';


/**
 * Generated class for the DashboradPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashborad',
  templateUrl: 'dashborad.html',
})
export class DashboradPage {

  private farm = [];
  private device_keys = [];
  private device_key;
  private device_name = [];

  private make_farm = 0;

  //function get_weather
  private all = [];
  private dashboard_temp = [];
  private dashboard_humid = [];
  private dashboard_light = [];
  private dashboard_pressure = [];
  private dashboard_device_key = [];
  private dashboard_device_name = [];

  public check_data_account = 0;
    
  constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public service: ServiceProvider) {
                  this.select_farm();
                }

      ionViewDidLoad() {
        console.log('Welcome to dashboard');
      }

      showDataAccount(){
        if(this.check_data_account==0){
        this.check_data_account ++;
        }else{
          this.check_data_account --;
        }
      }

       
      select_farm(){
        this.service.select_farm().subscribe((res)=>{
          let arr = new Array();
          for(let i in res){
            arr[i] = res[i].farm_name;
          }
          this.farm = arr;
        });
      }// part -> selection

      select_data_device(){
        this.service.select_data_farm(this.make_farm).subscribe((res)=>{
          
          for(let i in res){
            this.device_keys[i] = res[i].device_key;
          }
          this.get_weather(this.device_keys);
        });
      } //select device_key -> function get_weather

      get_weather(device_key){
        this.device_key = device_key;
        let username = localStorage.getItem("username");

          for(let i in this.device_key){
            this.service.getlast_data_sensor(username,this.device_key[i]).subscribe((res)=>{
              this.all[i] = res[0];
              this.dashboard_device_key[i] = this.all[i].device_key;
              this.dashboard_device_name[i] = this.all[i].device_name;
              this.dashboard_temp[i] = this.all[i].temperature;
              this.dashboard_humid[i] = this.all[i].humidity;
              this.dashboard_light[i] = this.all[i].light;
              this.dashboard_pressure[i] = this.all[i].pressure;
            }); 
            this.clear_data();
          }
      }

      detail_device(device_key,device_name){
        this.navCtrl.push(DetailDevicePage, {
          device_key : device_key,
          device_name : device_name
        });
      }
      
      clear_data(){
        this.device_keys = [];
        this.all.length = 0;
        this.dashboard_temp = [];
        this.dashboard_humid = [];
        this.dashboard_light = [];
        this.dashboard_pressure = [];
        this.dashboard_device_key =[];
        this.dashboard_device_name = [];
      }


}
