import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import { LoaderComponent } from './component/loader/loader.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {SplashComponent} from '@app/components/splash/splash.component';

@NgModule({
  declarations: [ LoaderComponent, SplashComponent],
  imports: [MaterialModule, NgxSpinnerModule, FlexLayoutModule, CommonModule, FormsModule, TranslateModule],
  exports: [MaterialModule, NgxSpinnerModule, FlexLayoutModule, CommonModule, FormsModule,  LoaderComponent, SplashComponent, TranslateModule],
  entryComponents: []
})
export class SharedModule {
}
