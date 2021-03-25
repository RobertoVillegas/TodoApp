import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

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

  ngOnInit() {
    this.duedate = formatDate(this.todoDuedate, 'MMM d, h:mm a', 'en');
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
