import { Component, OnInit } from '@angular/core';
import { TodoListService } from 'src/services/todo-list.service';
import { TodoListModel } from 'src/models/todo-list.model';

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
      let findCompleteTask = response.filter(item => item.IsComplete);
      let findOpenTask = response.filter(item => item.IsComplete == false);
      this.todoList = findOpenTask;
      this.todoListDone = findCompleteTask;
      console.log('this.todoListDone', this.todoListDone);
      
    });
  }

  public addTask(taskName: string) {
    this.todoListService.addTodoItem(taskName).subscribe((response) => {
      this.todoListModel = new TodoListModel();
      this.getTodoItems();
    });
    
  }

  public doneTask(todoListModel: TodoListModel) {
    this.todoListService.editTodoItem(todoListModel).subscribe(() => {
      this.getTodoItems();
    });
  }

  public deleteTask(idTask: number) {
    this.todoListService.removeTodoItem(idTask).subscribe(() => {
      this.getTodoItems();
    });
  }

}

