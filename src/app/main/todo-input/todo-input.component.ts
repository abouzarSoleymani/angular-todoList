import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '@app/core/services/tasks.service';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {AuthService} from '@app/core/services/auth.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {

  userinfo;
  taskInputForm: FormGroup;
  @Output('addedNewTask') addedNewTask = new EventEmitter();
  constructor(private fb: FormBuilder, private tasksService: TasksService, private  authService: AuthService ) { }

  ngOnInit() {
    this.createForm();
    this.userinfo = this.authService.getUserInfo();
  }
  createForm() {
    this.taskInputForm = this.fb.group({
      title: ['', Validators.required]
    });
  }
  addTask(){
    if(this.taskInputForm.invalid)
      return
    let task = {
      title: this.taskInputForm.value.title,
      completed: false,
      category: ['my'],
      startDate: '20/01/01',
      endDate:  '20/12/01',
      periodicity: 'daily'
    }
      this.tasksService.addTask(task).subscribe(data => {
        console.log(data)
        this.taskInputForm.reset()
        this.addedNewTask.emit(true)
      })
  }
}
