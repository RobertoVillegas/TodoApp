import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
  providers: [TodoService],
})
export class TodoListPage implements OnInit {
  todos: Todo[];

  constructor(
    private todoService: TodoService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastr: ToastController,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addNewTask() {
    this.router.navigate(['/add']);
  }

  edit(todoId) {
    this.router.navigate(['/edit/', todoId]);
  }

  async delete(todoId) {
    const loading = await this.loadingCtrl.create({
      message: 'deleting..',
      spinner: 'crescent',
      showBackdrop: true,
    });

    loading.present();

    this.afs
      .collection('todo')
      .doc(todoId)
      .delete()
      .then(() => {
        loading.dismiss();
        this.toast('Task deleted!', 'success');
      })
      .catch((error) => {
        this.toast(error.message, 'danger');
      });
  } // End of delete task

  async done(todoId) {
    const loading = await this.loadingCtrl.create({
      message: 'Updating status...',
      spinner: 'crescent',
      showBackdrop: true,
    });

    loading.present();

    this.afs
      .collection('todo')
      .doc(todoId)
      .update({
        status: 'Done',
      })
      .then(() => {
        loading.dismiss();
        this.toast('Task updated!', 'success');
      })
      .catch((error) => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      });
  } // End of done

  async toast(msg, status) {
    const toast = await this.toastr.create({
      message: msg,
      position: 'top',
      color: status,
      duration: 2000,
    });

    toast.present();
  } // End of toast
}
