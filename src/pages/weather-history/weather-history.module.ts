import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeatherHistoryPage } from './weather-history';

@NgModule({
  declarations: [
    WeatherHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(WeatherHistoryPage),
  ],
})
export class WeatherHistoryPageModule {}
