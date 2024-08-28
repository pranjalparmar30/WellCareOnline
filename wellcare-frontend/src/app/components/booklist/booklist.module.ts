import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../navbar/navbar.module';
import { BooklistRoutingModule } from './booklist-routing.module';
import { BooklistComponent } from './booklist/booklist.component';
import { BookComparisonComponent } from './book-comparison/book-comparison.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AddbookComponent } from './addbook/addbook.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RightclickDirective } from 'src/app/directives/rightclick.directive';


@NgModule({
  declarations: [
    BooklistComponent,
    BookComparisonComponent,
    BookDetailComponent,
    AddbookComponent,
    SearchPipe,
    RightclickDirective
  ],
  imports: [
    CommonModule,
    BooklistRoutingModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    InfiniteScrollModule
  ],
  providers:[
    SearchPipe
  ]
})
export class BooklistModule { }
