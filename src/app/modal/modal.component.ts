import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input('todoTitle') todoTitle;
  @Input('todoDesc') todoDesc;
  @Input('todoDuedate') todoDuedate;

  duedate: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
