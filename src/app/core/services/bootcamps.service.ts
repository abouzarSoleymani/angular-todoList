import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class BootcampsService {
  constructor(private api: ApiService) { }

  getLatestBootcamps(): Observable<any> {
    return this.api.get('todoList');
  }
}
