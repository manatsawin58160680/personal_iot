import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import ChartJS from 'chart.js'
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas_day') lineCanvas_day;

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
  device_name_work: any;
  test: any;
  test1 : any;
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider) {
    this.device_name_graph = this.navParams.get('Device_name');
    this.device_name_work = this.navParams.get('Device_name_work');
    this.service.select_userall().subscribe((res)=>{
      this.test1 = res[0].username;
 
    })
  }

  ionViewDidLoad() {}
   history(a,day){
     console.log(a + day);
    this.day = day;
    if(this.day == "HOUR"){
      this.Day_TH = "ชั่วโมง";
    }
    else if(this.day == "DAY"){
      this.Day_TH = "วัน";
    } 
    this.privious = a;
    this.times(this.privious,this.day);
  }

  history_chart(){
    this.service.history_day_chart(this.myDate).subscribe((res)=>{
      for (let i in res) {
        this.device_privious_temp[i] = res[i].temperature;
        this.device_privious_humidity[i] = res[i].humidity;
        this.device_privious_date[i] = res[i].date;
        this.device_privious_times[i] = this.device_privious_date[i].split(" ",2);
      }
      for(let i in this.device_privious_times){
        this.device_privious_time[i] = this.device_privious_times[i][1];
      }
      this.getLineChart_day(this.device_privious_temp, this.device_privious_humidity,this.device_privious_time);
    });
  }

  times(privious,day){
    this.device_name_graph = this.navParams.get('Device_name');
    this.service.select_privious(this.device_name_graph,privious,day).subscribe((res) => {
      console.log(res);
      this.test = res[0].temperature;
     
      for (let i in res) {
        this.device_privious_temp_date[i] = res[i].temperature;
        this.device_privious_humidity_date[i] = res[i].humidity;
        this.device_privious_date_date[i] = res[i].date;
        this.device_privious_times_date[i] = this.device_privious_date_date[i].split(" ",2);
      }
      console.log(this.device_privious_temp);
      for(let i in this.device_privious_times_date){
        this.device_privious_time_date[i] = this.device_privious_times_date[i][1];
      }
      this.getLineChart(this.device_privious_temp_date, this.device_privious_humidity_date,this.device_privious_time_date);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.lineChart = this.getLineChart(this.device_privious_temp_date, this.device_privious_humidity_date,this.device_privious_time_date);
      this.barChart = this.getBarChart();
      this.lineChart_day  = this.getLineChart_day(this.device_privious_temp, this.device_privious_humidity,this.device_privious_time);
    }, 150)
  }

  getbarChart(context, chartType, data, options?) {
    return new ChartJS(context, {
      data,
      options,
      type: 'horizontalBar'
    })
  }

  getChart(context, chartType, data, options?) {
    return new ChartJS(context, {
      data,
      options,
      type: chartType
    })
  }

  getLineChart_day(device_privious_temp, device_privious_humidity,device_privious_time){
    console.log(device_privious_temp);
    const data = {
      labels: device_privious_time,
      datasets: [{
        label: 'อุณหภูมิ',
        fill: false,
        lintTension: 0.1,
        backgroundColor: 'green',
        borderColor: 'rgb(231, 205, 35)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointTadius: 1,
        pointHitRadius: 1,
        data: device_privious_temp,
        scanGaps: false
      }, {
        label: 'ความชื้น',
        fill: false,
        lintTension: 0.1,
        backgroundColor: 'rgb(20, 0, 225)',
        borderColor: 'rgb(51, 50, 46)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointTadius: 1,
        pointHitRadius: 1,
        data: device_privious_humidity,
        scanGaps: false
      }]
    }
    return this.getChart(this.lineCanvas_day.nativeElement, 'line', data);
  }

  getLineChart(device_privious_temp_date, device_privious_humidity_date,device_privious_time_date) {

    const data = {
      labels: device_privious_time_date,
      datasets: [{
        label: 'อุณหภูมิ',
        fill: false,
        lintTension: 0.1,
        backgroundColor: 'green',
        borderColor: 'rgb(231, 205, 35)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointTadius: 1,
        pointHitRadius: 1,
        data: device_privious_temp_date,
        scanGaps: false
      }, {
        label: 'ความชื้น',
        fill: false,
        lintTension: 0.1,
        backgroundColor: 'rgb(20, 0, 225)',
        borderColor: 'rgb(51, 50, 46)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointTadius: 1,
        pointHitRadius: 1,
        data: device_privious_humidity_date,
        scanGaps: false
      }]
    }
    return this.getChart(this.lineCanvas.nativeElement, 'line', data);
    }
    getBarChart() {
      const data = {
        labels: ['Tempareture', 'Humidity'],
        datasets: [{
          label: ['Temparature'],
          data: [25.6, 90],
          backgroundColor: [
            'green',
            'rgb(20, 0, 225)'
          ],
          borderWidth: 3
        }]
      };
      const option = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }

    back_current(){
      this.navCtrl.pop();
    }

}
