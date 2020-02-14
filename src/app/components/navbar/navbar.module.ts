import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {NavbarComponent} from '@app/components/navbar/navbar.component';
import {DatePipe} from '@angular/common';
import {NgxPersianModule} from 'ngx-persian';

@NgModule({
    declarations: [
        NavbarComponent
    ],
  imports: [
    RouterModule,
    SharedModule,
    NgxPersianModule
  ],
    exports     : [
        NavbarComponent
    ],
  providers: []
})
export class NavbarModule {}
