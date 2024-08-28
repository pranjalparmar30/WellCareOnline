import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonserverService } from 'src/app/service/jsonserver.service';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookDetail!:any;
  bookForm!: FormGroup;

  constructor(
    private jsonserver: JsonserverService,
    private fb: FormBuilder,
    private jwt: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookDetail = this.jsonserver.bookdetailfrombooklist;
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
    this.patchFormWithExistingData();
  }

  patchFormWithExistingData(): void {
    if (this.bookDetail) {
      this.bookForm.patchValue({
        order: this.bookDetail.order,
        title: this.bookDetail.title,
        author: this.bookDetail.author,
        availability: this.bookDetail.availability,
        isbn: this.bookDetail.isbn,
        publishedDate: this.bookDetail.publishedDate,
        genre: this.bookDetail.genre,
        numberOfPages: this.bookDetail.numberOfPages,
        description: this.bookDetail.description
      });
    }
  }
  
  onSubmit(): void {
    if (this.bookForm.valid) {
      // Handle form submission
    } else {
      // Handle form invalid case
    }
  }
}
