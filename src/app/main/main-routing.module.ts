import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from '@app/core/services/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' , canActivate: [AuthGuard]},
  {path : 'auth', loadChildren: () => import('../modules/auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
