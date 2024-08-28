import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComparisonComponent } from './book-comparison.component';

describe('BookComparisonComponent', () => {
  let component: BookComparisonComponent;
  let fixture: ComponentFixture<BookComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComparisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
