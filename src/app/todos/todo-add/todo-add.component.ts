import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { crearTodo } from '../todo.actions';
import { Todo } from '../models/todo.model';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  txtInput: FormControl;

  constructor( private store: Store<AppState> ) { 
    this.txtInput = new FormControl( '', Validators.required );
  }

  ngOnInit(): void {
  }

  agregar(): void {
    if( this.txtInput.invalid ) return; 

    this.store.dispatch( crearTodo(new Todo(this.txtInput.value)) )
    this.txtInput.reset();
  }

}
