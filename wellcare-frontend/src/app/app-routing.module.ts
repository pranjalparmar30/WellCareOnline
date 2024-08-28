import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'registration', loadChildren: () => import('./components/registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'book', loadChildren: () => import('./components/booklist/booklist.module').then(m => m.BooklistModule), canActivate:[AuthGuard] },
  { path: 'transaction', loadChildren: () => import('./components/transaction/transaction.module').then(m => m.TransactionModule), canActivate:[AuthGuard] },
  { path: '**', redirectTo: '/login' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }