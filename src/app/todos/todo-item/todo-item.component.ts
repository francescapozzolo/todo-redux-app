import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { borrarTodo, editTodo, toggleTodo } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;

  chkCompletado!: FormControl;
  txtInput!: FormControl;

  editando: boolean = false;

  constructor( private store: Store<AppState> ) {
  }
  
  ngOnInit(): void {
    this.chkCompletado = new FormControl( this.todo.completado );
    this.txtInput      = new FormControl( this.todo.texto, Validators.required );

    this.chkCompletado.valueChanges.subscribe(
      value => this.store.dispatch( toggleTodo({id: this.todo.id}) )
    )
  }

  editar(): void {
    this.editando = true;
    this.txtInput.setValue( this.todo.texto );

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1)
  }

  terminarEdicion(): void {
    this.editando = false;
    
    if( this.txtInput.invalid ) return;
    if( this.txtInput.value === this.todo.texto ) return;

    this.store.dispatch( editTodo({texto: this.txtInput.value, id: this.todo.id}) );
  }

  borrar(): void {
    this.store.dispatch( borrarTodo({id: this.todo.id}));
  }

}
