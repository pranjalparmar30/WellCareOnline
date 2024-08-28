import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonserverService } from 'src/app/service/jsonserver.service';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-book-comparison',
  templateUrl: './book-comparison.component.html',
  styleUrls: ['./book-comparison.component.css']
})
export class BookComparisonComponent implements OnInit {
  comparisonBooks :any = [];
  constructor(
    private jsonserver: JsonserverService,
    private fb: FormBuilder,
    private jwt: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.comparisonBooks = this.jsonserver.comparisonBooksArrayJson;
  }

}
