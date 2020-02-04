import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import { LoaderComponent } from './component/loader/loader.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ LoaderComponent],
  imports: [MaterialModule, NgxSpinnerModule, FlexLayoutModule, CommonModule, FormsModule],
  exports: [MaterialModule, NgxSpinnerModule, FlexLayoutModule, LoaderComponent, FormsModule],
  entryComponents: []
})
export class SharedModule {
}
