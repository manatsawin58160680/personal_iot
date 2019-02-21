import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailDevicePage } from './detail-device';

@NgModule({
  declarations: [
    DetailDevicePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailDevicePage),
  ],
})
export class DetailDevicePageModule {}
