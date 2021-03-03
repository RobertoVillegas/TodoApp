import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoTestPage } from './todo-test.page';

const routes: Routes = [
  {
    path: '',
    component: TodoTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoTestPageRoutingModule {}
