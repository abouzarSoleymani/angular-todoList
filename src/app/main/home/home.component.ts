import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('todoListContainer', {static: false}) todoListContainer;
  constructor() { }

  ngOnInit() {
  }
  addedNewTask(event){
    if(event)
     this.todoListContainer.getAllTasks();
  }
}
