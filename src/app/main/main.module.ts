import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LatestsBootcampsComponent } from './latests-bootcamps/latests-bootcamps.component';
import {FindBootcampsComponent} from './find-bootcamps/find-bootcamps.component';


@NgModule({
  declarations: [HomeComponent, NavbarComponent, FindBootcampsComponent, LatestsBootcampsComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
