import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonserverService } from 'src/app/service/jsonserver.service';
import { JwtService } from 'src/app/service/jwt.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  books: any = [];
  currentPage = 1;
  pageSize = 5;
  searchText: string = '';
  userRole: string = ''; // Assume user role is initially empty
  comparisonBooks: any = [];

  constructor(
    private jsonserver: JsonserverService,
    private fb: FormBuilder,
    private jwt: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBooks()
    this.userRole = this.jwt.getDecoded()?.role || '';
  }


  getAllbooks(): void {
    this.jsonserver.getAllbooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
  getBooks(): void {
    this.jsonserver.getBooks(this.currentPage, this.pageSize)
      .subscribe((books: any) => {
        this.books.push(...books);
        console.log(this.books, 'Original position')
        this.currentPage++;
      });
  }

  onScroll(): void {
    this.getBooks();
  }

  editBook(book: any): void {
    if (!book) return;
    this.jsonserver.updateBookSelectedObj = book;
    this.router.navigate(['/book/add']);
  }

  deleteBook(book: any): void {
    alert(`delete book : ${book?.title}`);
  }

  borrowBook(book: any): void {
    alert(`borrow Book : ${book?.title}`);
  }

  toggleSelection(book: any, isChecked: any): void {
    if (isChecked.target.checked) {
      if (!this.comparisonBooks.some((selectedBook: any) => selectedBook.id === book.id)) {
        this.comparisonBooks.push(book);
      }
    } else {
      this.comparisonBooks = this.comparisonBooks.filter((selectedBook: any) => selectedBook.id !== book.id);
    }
  }

  onCompare() {
    this.jsonserver.comparisonBooksArrayJson = this.comparisonBooks;
    if (this.comparisonBooks.length < 2) {
      alert('Please select atleast 2 book to compare')
    } else {
      this.router.navigate(['/book/comparison']);
    }
  }

  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.books, event.previousIndex, event.currentIndex);
    console.log(this.books, "Reordered");
    this.updateOrder();
  }

  updateOrder(): void {
    this.books.forEach((book: any, index: any) => {
      book.order = index + 1;
    });
  }

  onRightClick(book: any): void {
    this.jsonserver.bookdetailfrombooklist = book;
    if (book) {
      this.router.navigate(['/book/details']);
    }
  }

}