import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoserviceService } from '../todoservice.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', [ animate(2000) ])
    ])
  ]
})
export class TodosComponent implements OnInit {
 todos: Todo[];
 fname = '';
  constructor(private todoService: TodoserviceService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.todoService.getData().subscribe(Response => this.todos = Response);
  }

  onSubmit() {
    this.todos.push({
      id : 4,
      title : this.fname,
      completed : false
    });
    this.fname = '';
  }

  Delete(todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
   this.todoService.deleteData(todo).subscribe(data => console.log(data));
  }

  FieldsChange(todo) {
    // toggle ui
    todo.completed = !todo.completed;
    // toggle server
    this.todoService.toggleCompleted(todo).subscribe( resp => console.log(resp));
}
}
