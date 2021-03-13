import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TodoListModel } from 'src/models/todo-list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(public httpClient: HttpClient) { }

  public getTodoItems(): Observable<TodoListModel[]> {
    return this.httpClient.get<TodoListModel[]>(environment.API_URL + '/api/TodoItems');
  }
}
