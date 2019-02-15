import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboradPage } from './dashborad';

@NgModule({
  declarations: [
    DashboradPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboradPage),
  ],
})
export class DashboradPageModule {}
