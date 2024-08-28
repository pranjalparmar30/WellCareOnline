import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonserverService } from 'src/app/service/jsonserver.service';
import { JwtService } from 'src/app/service/jwt.service';
import { CsvexportService } from 'src/app/service/csvexport.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  page: number = 1;
  pageNew: number = 1;
  data: any[] = [];
  returnedData: any = [];
  filteredData: any[] = [];
  private inputSubject = new Subject<string>();

  constructor(
    private jsonserver: JsonserverService,
    private fb: FormBuilder,
    private jwt: JwtService,
    private router: Router,
    private csvService: CsvexportService
  ) { }

  ngOnInit(): void {
    this.getBorrowed();
    this.getreturned();
    this.inputSubject.pipe(debounceTime(1000)).subscribe(() => {
      this.getreturned();
    });
  }

  getBorrowed(): void {
    this.jsonserver.getAllBorrowed()
      .subscribe((books: any) => {
        this.data = books;
        this.filteredData = [...this.data];
      }, (err: any) => {
        alert('Error Occured')
      });
  }
  
  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.inputSubject.next(inputValue);
  }

  getreturned(): void {
    this.jsonserver.getAllreturned()
      .subscribe((books: any) => {
        this.returnedData = books;
      }, (err: any) => {
        alert('Error Occured')
      });
  }

  //use for boorow
  exportData() {
    this.csvService.exportToCsv('export.csv', this.data);
  }

  // use for return
  exportDataReturned() {
    this.csvService.exportToCsv('export.csv', this.returnedData);
  }

  filterCriteria = {
    date: '',
    username: '',
    title: ''
  };

  onFilterChange() {
    this.filteredData = this.data?.filter(book =>
      (!this.filterCriteria.date || book.updatedAt.startsWith(this.filterCriteria.date)) &&
      (!this.filterCriteria.username || book.userName.includes(this.filterCriteria.username)) &&
      (!this.filterCriteria.title || book.title.includes(this.filterCriteria.title))
    );
  }
}