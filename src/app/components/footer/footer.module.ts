import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FooterComponent} from './footer.component';
import {SharedModule} from '@app/shared/shared.module';

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
export class FooterModule {}
