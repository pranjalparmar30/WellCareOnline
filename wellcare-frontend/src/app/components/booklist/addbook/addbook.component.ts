import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonserverService } from 'src/app/service/jsonserver.service';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  bookForm!: FormGroup;
  updateBookObj!: any;
  updatee: boolean = false;

  constructor(
    private jsonserver: JsonserverService,
    private fb: FormBuilder,
    private jwt: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      order: [''],
      title: ['', Validators.required],
      author: ['', Validators.required],
      availability: [false, Validators.required],
      isbn: ['', Validators.required],
      publishedDate: ['', Validators.required],
      genre: ['', Validators.required],
      numberOfPages: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      description: ['']
    });
    this.updateBookObj = this.jsonserver.updateBookSelectedObj;
    if (this.updateBookObj) {
      this.updatee = true;
      this.updateForm(this.updateBookObj)
    }
  }

  onSubmit(): void {
    if (!this.updatee) {
      if (this.bookForm.valid) {
        const randomValue = Math.floor(Math.random() * 1000) + 101; // Random value between 101 and 1000
        this.bookForm.patchValue({ order: randomValue });
        this.jsonserver.addbook(this.bookForm.value).subscribe({
          next: (response) => {
            alert('New Book added successfully!');
            this.bookForm.reset();
          },
          error: (error) => {
            alert('Error adding book');
          }
        });
      } else {
        alert('Form not valid');
      }
    } else {
      this.onUpdate();
    }
  }

  updateForm(book: any): void {debugger
    this.bookForm.patchValue({
      order: book.order,
      title: book.title,
      author: book.author,
      availability: book.availability,
      isbn: book.isbn,
      publishedDate: book.publishedDate,
      genre: book.genre,
      numberOfPages: book.numberOfPages,
      description: book.description
    });
  }

  onUpdate(): void {
    if (this.bookForm.valid) {
      const data = {
        ...this.bookForm.value,
        id: this.updateBookObj.id
      }
      this.jsonserver.updateBook(data).subscribe({
        next: (response) => {
          console.log('Book updated successfully!', response);
          this.bookForm.reset();
          this.updatee = false;
          this.updateBookObj=  null;
          alert('Book updated successfully!');
        },
        error: (error) => {
          alert('Error updating book');
        }
      });
    } else {
      alert('Form not valid or no book selected');
    }
  }
}
