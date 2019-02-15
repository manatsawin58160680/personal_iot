import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifilePage } from './modifile';

@NgModule({
  declarations: [
    ModifilePage,
  ],
  imports: [
    IonicPageModule.forChild(ModifilePage),
  ],
})
export class ModifilePageModule {}
