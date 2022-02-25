import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPageRoutingModule } from './info-routing.module';

import { InfoPage } from './info.page';
import { SignaturePadModule } from 'angular2-signaturepad';
import { FileOpener } from '@ionic-native/file-opener/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPageRoutingModule,
    ReactiveFormsModule,
    SignaturePadModule
  ],
  declarations: [InfoPage],
  providers: [FileOpener]
})
export class InfoPageModule {}
