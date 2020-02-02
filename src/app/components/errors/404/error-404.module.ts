import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {Error404Component} from './error-404.component';
import {SharedModule} from 'app/shared/shared.module';
const routes = [
    {
        path     : '',
        component: Error404Component
    }
];

@NgModule({
    declarations: [
        Error404Component
    ],
    imports     : [
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class Error404Module
{
}
