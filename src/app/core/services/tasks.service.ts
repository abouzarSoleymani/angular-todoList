import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private api: ApiService) { }

  getTasks(): Observable<any> {
    return this.api.get('tasks');
  }
  addTask(task) {
    return this.api.post('tasks', task);
  }
  removeTask(id){
    return this.api.delete(`tasks/${id}`);
  }
  updateTask(task){
    return this.api.put(`tasks/${task._id}`, task);
  }
}
