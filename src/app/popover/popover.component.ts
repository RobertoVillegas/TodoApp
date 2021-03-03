import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input('todoId') todoId;

  constructor(
    private popoverController: PopoverController,
    private router: Router,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    console.log('Popover inicializado');
    console.log(this.todoId);
  }

  edit() {
    this.router.navigate(['/edit/', this.todoId]);
    this.ClosePopover();
  }

  ClosePopover() {
    this.popoverController.dismiss();
  }

  async delete() {
    this.ClosePopover();
    const loading = await this.loadingCtrl.create({
      message: 'deleting..',
      spinner: 'crescent',
      showBackdrop: true,
    });

    loading.present();

    this.afs
      .collection('todo')
      .doc(this.todoId)
      .delete()
      .then(() => {
        loading.dismiss();
        this.toast('Task deleted!', 'success');
      })
      .catch((error) => {
        this.toast(error.message, 'danger');
      });
  } // End of delete task

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
