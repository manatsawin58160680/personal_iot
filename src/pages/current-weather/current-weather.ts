import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, ModalController, PopoverController, MenuController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Geolocation } from '@ionic-native/geolocation';
import { ModalpagePage } from '../modalpage/modalpage';
import { ControlpagePage } from '../controlpage/controlpage';
import { Geocoder } from '@ionic-native/google-maps';
import { FilterPage } from '../filter/filter';
import leaflet from 'leaflet';
import { MapPage } from '../map/map';
import { Conditional } from '@angular/compiler';
import ChartJS from 'chart.js'
import { NotificationPage } from '../notification/notification'
import { AddDevicePage } from '../add-device/add-device';
import { HistoryPage } from '../history/history';

declare var google: any;


@Component({
  selector: 'page-current-weather',
  templateUrl: 'current-weather.html',
})
export class CurrentWeatherPage {

  private data_device_all = [];
  private data_device_all_temp = [];
  private data_device_all_humid = [];
  private data_device_all_light = [];
  private data_device_all_pressure = [];
  private data_device_all_date = [];
  private data_device_all_time = [];
  private data_device_all_rssi = [];
  private data_device_all_names = [];
  private data_device_all_name = [];
  private data_device_all_falenhigh = [];

  private filter_device = [];
  private filter_device_name = [];
  private filter_device_work_name = [];
  
  private Parish;
  private Number_home;
  private data_device;
  private showComp = false; 

  filter_service_all: any;
  District: any;
  Province: any;
  all: any;
  device_name_work: any;
  device_name: any;
  distant: any;
  district: any;

  lineChart_day: any;
  lineChart: any;
  barChart: any;
  device_name_graph: any;
  private time;
  private device_privious_temp = [];
  private device_privious_humidity = [];
  private device_privious_date = [];
  private device_privious_times = [];
  private device_privious_time = [];
  private device_privious_temp_date = [];
  private device_privious_humidity_date = [];
  private device_privious_date_date = [];
  private device_privious_times_date = [];
  private device_privious_time_date = [];
  private myDate;
  private privious;
  day: any;
  Day_TH: any;
  

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas_day') lineCanvas_day;
  @ViewChild('map') mapContainer: ElementRef;
  private map: any;


  constructor(public menuCtrl:MenuController,
    public navCtrl: NavController,
    public plat: Platform,
    public geolocation: Geolocation,
    public geocoder: Geocoder,
    public alertCtrl: AlertController,
    public service: ServiceProvider,
    public modal: ModalController,
    public popover: PopoverController,
    public modalCtrl : ModalController) {

    let username = localStorage.getItem("username");
    this.menuCtrl.enable(true);
    this.refresh();
    this.filter();
    this.getCurrAddress();
    // setInterval(() => { 
    //   this.select(this.device_name) // Now the "this" still references the component
    //  }, 1000);

  }

    getCurrAddress() {
      this.geolocation.getCurrentPosition().then(res => {
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(res.coords.latitude, res.coords.longitude)
        let request = {
          latLng: latlng
        };
        geocoder.geocode(request, (data, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (data[0] != null) {
              this.Number_home = data[0].address_components[1].short_name;
              this.Parish = data[0].address_components[2].short_name;
              this.District = data[0].address_components[3].short_name;
              this.Province = data[0].address_components[4].short_name;
              this.district = this.District;
              this.all = this.Parish + "" + this.District;
              // this.Number_home + " " + this.Parish + " " + this.District + " " +
            } else {
            }
          }
        })
      });
    }

    select(data_device) {
      console.log(data_device);
      let username = localStorage.getItem("username");
      for (let j in data_device) {
        this.service.getlast_data_sensor(username, data_device[j]).subscribe((res) => {
          this.data_device_all[j] = res[0];
          this.data_device_all_temp[j] = this.data_device_all[j].Temperature;
          this.data_device_all_humid[j] = this.data_device_all[j].Humidity;
          this.data_device_all_light[j] = this.data_device_all[j].light;
          this.data_device_all_pressure[j] = this.data_device_all[j].pressure; 
          this.data_device_all_date[j] = this.data_device_all[j].Date;
          this.data_device_all_time[j] = this.data_device_all[j].Time;
          this.data_device_all_name[j] = this.data_device_all[j].Device_work_name;
          this.data_device_all_names[j] = this.data_device_all[j].Device_name;
          this.data_device_all_rssi[j] = this.data_device_all[j].Rssi;
          console.log(this.data_device_all_rssi);
        });
        this.data_device_all = [];
        this.showComp = false;
      }
    }

    History(device_name) {
      this.service.history_dayy(device_name).subscribe((res)=>{

        let t = res[0].device_name;
        let n = res[0].device_description;
         
        const myModal = this.modal.create(HistoryPage,
          {
            Device_name_work: n,
            Device_name: t
          });
        myModal.present();
      });
    }

    Control() {
      const myModal = this.modal.create(ControlpagePage);
      myModal.present();
    }

    refresh() {
      let username = localStorage.getItem("username");
      this.service.getdeviceby_username(username).subscribe((res_value) => {
        this.data_device = res_value;
          for (let j in this.data_device) {
            this.service.getlast_data_sensor(username, this.data_device[j].device_name).subscribe((res) => {
              this.data_device_all[j] = res[0];
              this.data_device_all_temp[j] = this.data_device_all[j].Temperature;
              this.data_device_all_falenhigh[j] = (1.8 * this.data_device_all[j].Temperature)+32;
              this.data_device_all_humid[j] = this.data_device_all[j].Humidity;
              this.data_device_all_light[j] = this.data_device_all[j].light;
              this.data_device_all_date[j] = this.data_device_all[j].Date;
              this.data_device_all_time[j] = this.data_device_all[j].Time;
              this.data_device_all_name[j] = this.data_device_all[j].Device_work_name;
              this.data_device_all_pressure[j] = this.data_device_all[j].pressure; 
              this.data_device_all_names[j] = this.data_device_all[j].Device_name;
              this.data_device_all_rssi[j] = this.data_device_all[j].Rssi;
            });
            this.data_device_all = [];
          }
      });
    }

    filter() {
      let username = localStorage.getItem('username');
      this.service.getdeviceby_username(username).subscribe((res) => {
        this.filter_service_all = res;
        for (let i in res) {
          this.filter_device_name[i] = this.filter_service_all[i].device_name;
          this.filter_device_work_name[i] = this.filter_service_all[i].device_description;
        }
      })
    }

    b() {
      this.showComp = !this.showComp;
    }

    fill() {
      console.log(this.filter_device);
      // this.select(this.filter_device);
      this.service.get_device_description(this.filter_device).subscribe((res)=>{
        console.log(res);
      });
    }

    fullmap(){
      this.navCtrl.push(MapPage, {
        coordinate: this.all
      });
    }

    notification(Device_name,Device_work_name){
      let profileModal = this.modalCtrl.create(NotificationPage, 
        { 
          Device_name: Device_name,
          Device_work_name: Device_work_name 
        });
      profileModal.present();
    }

    doRefresh(refresher) {
      setTimeout(() => {
        this.refresh();
        refresher.complete();
      }, 2000);
    }

    add(){
      this.navCtrl.push(AddDevicePage);
    }
}
