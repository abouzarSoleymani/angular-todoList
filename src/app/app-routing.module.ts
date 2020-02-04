import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './components/layout/layout.component';


const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
      { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule)}
    ]
  },
  {path: '**', redirectTo: 'not-found'},
  {path: 'not-found', loadChildren: () => import('./components/errors/404/error-404.module').then(m => m.Error404Module)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
