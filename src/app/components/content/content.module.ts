import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {ContentComponent} from './content.component';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports     : [
        RouterModule,
        SharedModule
    ],
    exports     : [
        ContentComponent
    ]
})
export class ContentModule
{
}
