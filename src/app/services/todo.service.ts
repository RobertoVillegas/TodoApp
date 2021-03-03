import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

import { map } from 'rxjs/operators';

@Injectable()
export class TodoService {
  todoCol: AngularFirestoreCollection<Todo>;
  todoDoc: AngularFirestoreDocument<Todo>;
  todos: Observable<Todo[]>;
  todo: Observable<Todo>;
  todo$: any;

  constructor(private afs: AngularFirestore) {
    this.todoCol = this.afs.collection('todo', (ref) => ref.orderBy('createdAt', 'desc'));
    this.todos = this.todoCol.snapshotChanges().pipe(
      map((action) => {
        return action.map((a) => {
          const data = a.payload.doc.data() as Todo;
          data.todoId = a.payload.doc.id;
          return data;
        });
      })
    );
  } // End of constructor

  getTodos() {
    return this.todos;
  } // End of get todo list

  getTodo(todoId) {
    this.todoDoc = this.afs.doc<Todo>(`todo/${todoId}`);
    return (this.todo = this.todoDoc.valueChanges());
  } // End of get todo by id
}
