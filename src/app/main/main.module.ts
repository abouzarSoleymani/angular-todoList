import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@app/shared/shared.module';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodoListContainerComponent } from './todo-list-container/todo-list-container.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, TodoInputComponent, TodoListContainerComponent, TodoItemComponent],
  exports: [
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MainModule { }
