import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentWeatherPage } from './current-weather';

@NgModule({
  declarations: [
    CurrentWeatherPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentWeatherPage),
  ],
})
export class CurrentWeatherPageModule {}
