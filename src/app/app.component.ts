import { Component, OnInit } from '@angular/core';
import { TodoListService } from 'src/services/todo-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public todoListService: TodoListService) { }

  ngOnInit() {
    this.getTodoItems();
  }

  public getTodoItems() {
    this.todoListService.getTodoItems().subscribe((response) => {
      console.log('response', response);
    });
  }

}

