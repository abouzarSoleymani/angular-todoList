import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {SharedModule} from '../../shared/shared.module';
import {FooterComponent} from './footer.component';

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports     : [
        RouterModule,
        SharedModule
    ],
    exports     : [
        FooterComponent
    ]
})
export class FooterModule
{
}
