import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

/*
  Generated class for the ServiceProvider provider.
  CREATE BY  Manatsawin Sangon.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ServiceProvider {

  data: any = {};
  // api = "http://192.168.137.1/PHP/N_Service/";
  api_config = "http://192.168.1.1/";
   api = "http://localhost/PHP/N_Service/";

  constructor(public http: Http) {
    this.data.response = '';
  }

  insert_register(name, username, password, device, name_work, latitude, longitude) {
    // funcition about : insert data put to devices and users table from RegisterPage
    // create by Manatsawin Sangon



    let url = this.api + "API_Users.php?Name=" + name +
      "&Username=" + username +
      "&Password=" + password +
      "&Device_name=" + device +
      "&Device_work_name=" + name_work +
      "&latitude=" + latitude +
      "&longtitude=" + longitude;

    return this.http.get(url);
  }

  select_login(name, password) {
    // this function about : login (name, Password)
    let url = this.api +
      "API_Login.php?username=" + name +
      "&password=" + password;
    return this.http.get(url).map((res) => res.json());
  }

  select_userall() {

    // this function about : select all from users table. use to LoginPage
    // create by Manatsawin Sangon

    let url = this.api + "API_Userall.php";
    return this.http.get(url).map((res) => res.json());
  }

  getdeviceby_username(username) {
    // get value.device of device by username  old : many_of_device

    let url = this.api + "API_getdeviceby_username.php?username=" + username;
    // console.log(url);
    return this.http.get(url).map((res) => res.json());
  }

  select_data_device() {
    // this function about : ------ get data from sensors table all
    // create by Manatsawin Sangon 

    let url = this.api + "API_Device_data.php";
    return this.http.get(url).map((res) => res.json());
  }

  getlast_data_sensor(username, device) {
    console.log(device);
    let url = this.api + "API_getlast_device_data.php?" +
      "Username=" + username +
      "&device_name=" + device;
    return this.http.get(url).map((res) => res.json());

  }

  config_wifi(Username_wifi, Password_wifi) {
    let url = this.api_config + "setap?ssid=" + Username_wifi +
      "&pass=" + Password_wifi;
    return this.http.get(url);
  }

  insert_device(_username_config, _user_device, _user_work) {
    let get = this.http.get(this.api + "API_Add_device.php?Username=" + _username_config +
      "&Device_name=" + _user_device +
      "&Device_work_name=" + _user_work);
    return get.map((res) => res.json());
  }

  select_privious(device_name, times, day) {
    let url = "https://localhost/PHP/N_Service/API_Previous_Hour.php?device_name=" + device_name + "&times=" + times + "&histime=" + day;
    return this.http.get(url).map((res) => res.json());
  }

  update(New_device_name, device_name, name) {
    // update device_name in Profile page.
    let url = this.api + "API_Update.php?new_device_work_name=" + New_device_name
      + "&data_device_name=" + device_name
      + "&name=" + name;
    return this.http.get(url).map((res) => res.json());
  }

  delete(device_name, name) {
    // function about : delete from device_name in Profile page. 
    // Create by Manatsawin Sangon 
    let url = this.api + "API_Delete.php?data_device_name=" + device_name +
      "&name=" + name;
    return this.http.get(url).map((res) => res.json());
  }

  update_name(new_user_name, name) {
    // function about : update device_name in Profile page.
    // create by Manatsawin Sangon 
    let url = this.api + "API_Update_name.php" +
      "?new_user_name=" + new_user_name +
      "&name=" + name;

    return this.http.get(url).map((res) => res.json());
  }

  history_day_chart(date) {
    //console.log(date);
    // function about : select data_weather from sensor follow by date.
    // create by Manatsawin Sangon 
    let url = "https://localhost/PHP/N_Service/API_day.php?date=" + date;
    return this.http.get(url).map((res) => res.json());
  }

  history_dayy(device_name) {
    // function about : select weather data from sensor by device_name.
    // create by Manatsawin Sangon
    let url = this.api + "API_Name_of_device.php?device_name=" + device_name;
    return this.http.get(url).map((res) => res.json());
  }

  Add_Notification(device_name, weather, operator, weather_value, description) {
    // function about : insert notification data put to database this name is notifications\
    // create by Manatsawin Sangon
    return this.http.get(this.api + "API_Device_noti.php?device_name=" + device_name +
      "&weather=" + weather +
      "&operator=" + operator +
      "&weather_value=" + weather_value +
      "&description=" + description);
  }

  Select_Notification(device_name) {
    // function about : select notification data from table notifications select by device_name.
    // create by Manatsawin Sangon 

    let url = this.api + "API_Select_Device_noti.php?device_name=" + device_name;
    return this.http.get(url).map((res) => res.json());
  }

  Delete_notifi(notifi_id, device_name) {
    // function about : delete notification . delete from notification_id, device_name.
    // create by Manatsawin Sangon 

    let url = this.api + "API_Delete_Notification.php?notifi_id=" + notifi_id +
      "&device_name=" + device_name;
    return this.http.get(url).map((res) => res.json());
  }

  notification_compare(device_name) {
    // function about : compare notification data between notification and another notification .
    // create by Manatsawin Sangon 

    let url = this.api + "API_notification_compare.php?" +
      "device_name=" + device_name;

    return this.http.get(url).map((res) => res.json());
  }

  select_noti_by_device_name(device_name) {
    // functiion about : select notificatin data from table notifications by device_name.
    // create by Manatsawin Sangon.

    let url = this.api + "API_Select_Noti.php?device_name=" + device_name;
    return this.http.get(url).map((res) => res.json());
  }

  notification_status(notification_id, notification_status) {
    let url = this.api + "API_Update_Notification_status.php?" +
      "notification_id=" + notification_id +
      "&notification_status=" + notification_status;
    return this.http.get(url);
  }

  select_noti_device(username) {
    let url = this.api + "API_getdeviceby_username_noti.php?username=" + username;
    return this.http.get(url).map((res) => res.json());
  }

  register(user) {
    // let a = user.name;
    // let q :any;
    let url = this.api + "API_Register.php";
    // this.http.post(url , a).subscribe(data=>{
    //   q = data;
    //   q.response  
    // })
    var myData = JSON.stringify(user);
    console.log(myData);

    this.http.post(url, myData).subscribe(data => {
      this.data.response = data["_body"];
      console.log(this.data.response);
    }, error => {
      console.log("Oooops!");
    });
  }
  get_device_description(description){
    let url = this.api + "API_des_of_device.php?description=" + description;
    return this.http.get(url).map((res)=>res.json());

  }
  select_devices(place){
    let url = this.api + "API_Select_Deviecs.php?place=" + place;
    return this.http.get(url).map((res)=>res.json());
  }

  select_devices_type(place,type){
    let url = this.api + "API_Select_Deviecs_type.php?place=" + place +
              "&type=" + type;
    return this.http.get(url).map((res)=>res.json());
  }
}

