import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverConfigPage } from './popover-config';

@NgModule({
  declarations: [
    PopoverConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverConfigPage),
  ],
})
export class PopoverConfigPageModule {}
