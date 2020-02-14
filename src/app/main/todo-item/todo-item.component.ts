import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TasksService} from '@app/core/services/tasks.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input('task') task;
  @Output('removedTask') removedTask = new EventEmitter();
  @Output('updateTask') updateTask = new EventEmitter();
  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  }

  removeTask(id){
    this.tasksService.removeTask(id).subscribe( data => {
      console.log(data);
      this.removedTask.emit(true);
    })
  }

  completeTask(task){
    task.completed = true;
    this.tasksService.updateTask(task).subscribe(data => {
      console.log(data)
      this.updateTask.emit(true);
    })
  }
}
