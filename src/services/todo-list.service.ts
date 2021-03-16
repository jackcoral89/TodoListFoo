import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TodoListModel } from 'src/models/todo-list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public httpClient: HttpClient) { }

  public getTodoItems(): Observable<TodoListModel[]> {
    return this.httpClient.get<TodoListModel[]>(environment.API_URL + '/api/TodoItems');
  }

  public addTodoItem(taskName: string): Observable<TodoListModel> {
    return this.httpClient.post<TodoListModel>(environment.API_URL + '/api/TodoItems', { Name: taskName }, this.httpOptions);
  }

  public removeTodoItem(idTask: number): Observable<TodoListModel> {
    return this.httpClient.delete<TodoListModel>(environment.API_URL + '/api/TodoItems/' + idTask);
  }

  public editTodoItem(idTask: number): Observable<TodoListModel> {
    const body = {
      Id: idTask,
      IsComplete: true
    }
    return this.httpClient.put<TodoListModel>(environment.API_URL + '/api/TodoItems/' + idTask, body, this.httpOptions);
  }

}
