import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import { LoaderComponent } from './component/loader/loader.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [ LoaderComponent],
  imports: [MaterialModule, NgxSpinnerModule, CommonModule],
  exports: [MaterialModule, NgxSpinnerModule, LoaderComponent],
  entryComponents: []
})
export class SharedModule {
}
