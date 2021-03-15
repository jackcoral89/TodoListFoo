import { Component, OnInit } from '@angular/core';
import { TodoListService } from 'src/services/todo-list.service';
import { InputTextModule } from 'primeng/inputtext';
import { TodoListModel } from 'src/models/todo-list.model';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public todoListModel: TodoListModel = new TodoListModel();
  public todoList: TodoListModel[] = [];
  public todoListDone: TodoListModel[] = [];

  constructor(public todoListService: TodoListService) { }

  ngOnInit() {
    this.getTodoItems();
  }

  public getTodoItems() {
    this.todoListService.getTodoItems().subscribe((response) => {
      console.log('response', response);
      this.todoList = response;
      let findCompleteTask = response.filter(item => item.IsComplete);
      if (findCompleteTask) {
        this.todoListDone = findCompleteTask;
      }
    });
  }

  public addTask(taskName: string) {
    this.todoListService.addTodoItem(taskName).subscribe((response) => {
      console.log('response', response);
      this.todoListModel = new TodoListModel();
      this.getTodoItems();
    });
    
  }

  public doneTask(idTask: number) {
    this.todoListService.editTodoItem(idTask).subscribe((response) => {
      this.getTodoItems();
    });
  }

  public deleteTask(idTask: number) {
    this.todoListService.removeTodoItem(idTask).subscribe((response) => {
      this.getTodoItems();
    });
  }

}

