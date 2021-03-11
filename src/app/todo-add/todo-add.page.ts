import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularDelegate, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.page.html',
  styleUrls: ['./todo-add.page.scss'],
})
export class TodoAddPage implements OnInit {
  title: string;
  desc: string;
  duedate: number;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) {}

  ngOnInit() {}

  async addTask() {
    console.log();
    if (this.title && this.duedate) {
      const loading = await this.loadingCtrl.create({
        message: 'add task..',
        spinner: 'crescent',
        showBackdrop: true,
      });

      loading.present();

      const todoId = this.afs.createId();

      this.afs
        .collection('todo')
        .doc(todoId)
        .set({
          todoId: todoId,
          title: this.title,
          desc: this.desc || '',
          duedate: this.duedate,
          status: false,
          createdAt: Date.now(),
        })
        .then(() => {
          loading.dismiss();
          this.toast('Task successfully added!', 'success');
          this.router.navigate(['/list']);
        })
        .catch((error) => {
          loading.dismiss();
          this.toast(error.message, 'danger');
        });
    }
  } // End of addTask()

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
