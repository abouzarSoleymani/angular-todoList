import { Component, OnInit } from '@angular/core';
import {TasksService} from '@app/core/services/tasks.service';

@Component({
  selector: 'app-todo-list-container',
  templateUrl: './todo-list-container.component.html',
  styleUrls: ['./todo-list-container.component.scss']
})
export class TodoListContainerComponent implements OnInit {

  tasks;
  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks(){
    this.tasksService.getTasks().subscribe( data => {
      this.tasks = data.data;
    })
  }
}
