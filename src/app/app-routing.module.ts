import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: 'list',
    loadChildren: () => import('./todo-list/todo-list.module').then((m) => m.TodoListPageModule),
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'add',
    loadChildren: () => import('./todo-add/todo-add.module').then((m) => m.TodoAddPageModule),
  },
  {
    path: 'edit/:todoId',
    loadChildren: () => import('./todo-edit/todo-edit.module').then((m) => m.TodoEditPageModule),
  },
  {
    path: 'test',
    loadChildren: () => import('./todo-test/todo-test.module').then((m) => m.TodoTestPageModule),
  },
  {
    path: 'acerca',
    loadChildren: () => import('./acerca/acerca.module').then( m => m.AcercaPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
