import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, PopoverController } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule } from '@angular/http'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { ServiceProvider } from '../providers/service/service';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ConfigPage } from '../pages/config/config';
import { ProfilePage } from '../pages/profile/profile';
import { MomentModule } from 'angular2-moment';
import { Geolocation } from '@ionic-native/geolocation';
import { ModalpagePage } from '../pages/modalpage/modalpage';
import { ControlpagePage } from '../pages/controlpage/controlpage';
import { Geocoder } from '@ionic-native/google-maps';
import { ModifilePage } from '../pages/modifile/modifile';
import { PopoverConfigPage } from '../pages/popover-config/popover-config';
import { FilterPage } from '../pages/filter/filter';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import { Test1Page } from '../pages/test1/test1';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { CurrentWeatherPage } from '../pages/current-weather/current-weather';
import { MapPage } from '../pages/map/map';
import { WeatherHistoryPage } from '../pages/weather-history/weather-history';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ServiceApiProvider } from '../providers/service-api/service-api';
import { NotificationPage } from '../pages/notification/notification';
import { AddDevicePage } from '../pages/add-device/add-device';
import { HistoryPage } from '../pages/history/history';
import { DashboradPage } from '../pages/dashborad/dashborad';
import { DetailDevicePage } from '../pages/detail-device/detail-device';



@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ConfigPage,
    ProfilePage,
    ModalpagePage,
    ControlpagePage,
    ModifilePage,
    PopoverConfigPage,
    FilterPage,
    Test1Page,
    CurrentWeatherPage,
    MapPage,
    WeatherHistoryPage,
    NotificationPage,
    AddDevicePage,
    HistoryPage,
    DashboradPage,
    DetailDevicePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    HttpModule,
    MomentModule,
    SelectSearchableModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ConfigPage,
    ProfilePage,
    ModalpagePage,
    ControlpagePage,
    ModifilePage,
    PopoverConfigPage,
    FilterPage,
    Test1Page,
    CurrentWeatherPage,
    MapPage,
    WeatherHistoryPage,
    NotificationPage,
    AddDevicePage,
    HistoryPage,
    DashboradPage,
    DetailDevicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServiceProvider,
    Geolocation,
    Geocoder,
    Hotspot,
    LocalNotifications,
    ScreenOrientation,
    ServiceApiProvider

  ]
})
export class AppModule { }
