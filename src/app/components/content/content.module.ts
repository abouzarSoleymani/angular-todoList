import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ContentComponent} from './content.component';
import {SharedModule} from '@app/shared/shared.module';

@NgModule({
    declarations: [
        ContentComponent,
    ],
    imports     : [
        RouterModule,
        SharedModule,
    ],
    exports     : [
        ContentComponent
    ]
})
export class ContentModule
{
}
