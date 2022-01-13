import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { IonicModule } from "@ionic/angular";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
