import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import {
  LoadingController,
  ModalController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { PopoverComponent } from '../popover/popover.component';
import { ModalComponent } from '../modal/modal.component';
// import { TodoAddPageRoutingModule } from '../todo-add/todo-add-routing.module';

// import { Confetti } from '../../assets/js/confetti.min.js';

// declare var Confetti: any;
// const confetti = require('canvas-confetti');
// import { confettiCannon } from 'canvas-confetti';
// import * as Confetti from 'canvas-confetti';

import * as Party from 'party-js';
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
    private afs: AngularFirestore,
    public popoverController: PopoverController,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  async displayConfetti() {
    const party = Party;
    console.log('confetti');
    let siteColors = ['#ffa68d', '#fd3a84'];
    party.screen({
      // color: siteColors,
      size: party.minmax(6, 12),
      // count: party.variation(300 * (window.innerWidth / 1980), 0.4),
      count: 300,
      angle: -180,
      spread: 80,
      angularVelocity: party.minmax(6, 9),
    });
  }

  async presentPopover(ev, todoId: string) {
    // ev: any
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        todoId: todoId,
      },
    });
    return await popover.present();
  }

  async presentModal(todoTitle: string, todoDesc: string, todoDuedate: string) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-modal-css',
      componentProps: {
        todoTitle: todoTitle,
        todoDesc: todoDesc,
        todoDuedate: todoDuedate,
      },
      swipeToClose: true,
      // showBackdrop: true,
      // backdropDismiss: false,
    });
    return await modal.present();
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

  async done(todoId, todoStatus: boolean) {
    const loading = await this.loadingCtrl.create({
      message: 'Updating status...',
      spinner: 'crescent',
      showBackdrop: true,
    });

    loading.present();

    const statusTmp = todoStatus === true ? false : true;

    this.afs
      .collection('todo')
      .doc(todoId)
      .update({
        status: statusTmp,
      })
      .then(() => {
        loading.dismiss();
        this.toast('Task updated!', 'success');
        if (statusTmp === true) {
          this.displayConfetti();
        }
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
