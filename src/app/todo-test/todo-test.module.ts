import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoTestPageRoutingModule } from './todo-test-routing.module';

import { TodoTestPage } from './todo-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoTestPageRoutingModule
  ],
  declarations: [TodoTestPage]
})
export class TodoTestPageModule {}
