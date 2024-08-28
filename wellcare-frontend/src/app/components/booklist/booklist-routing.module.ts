import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooklistComponent } from './booklist/booklist.component';
import { AddbookComponent } from './addbook/addbook.component';
import { BookComparisonComponent } from './book-comparison/book-comparison.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

const routes: Routes = [
  { path: '', component: BooklistComponent },
  { path: 'add', component: AddbookComponent },
  { path: 'comparison', component: BookComparisonComponent },
  { path: 'details', component: BookDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooklistRoutingModule { }
