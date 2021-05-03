import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'flix-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input('totalItems') totalItems = 1;
  @Input('currentPage') currentPage: number;
  @Input('pageSize') pageSize = 20;
  @Input('maxPages') maxPages = 10;

  totalPages: number = 1;
  startPage: number = 1;
  endPage: number = this.maxPages;
  pages: number[] = [];

  @Output() pageChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    this.currentPage = +this.currentPage;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.calc();
  }

  get isFirst(): boolean {
    return this.currentPage === 1;
  }

  get isLast(): boolean {
    return this.currentPage === this.totalPages;
  }

  prev() {
    this.currentPage = Math.max(1, this.currentPage - 1);
    this.onChange();
  }

  next() {
    this.currentPage = Math.min(
      this.totalPages as number,
      this.currentPage + 1
    );
    console.log(this.currentPage);
    this.onChange();
  }

  pageNoClick(page: number) {
    this.currentPage = page;
    this.onChange();
  }

  private onChange() {
    this.calc();
    this.pageChange.emit(this.currentPage);
  }

  private calc() {
    if (this.totalPages <= this.maxPages) {
      // total pages less than max so show all pages
      this.startPage = 1;
      this.endPage = this.totalPages;
    } else {
      // total pages more than max so calculate start and end pages
      let maxPagesBeforeCurrentPage = Math.floor(this.maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(this.maxPages / 2) - 1;
      if (this.currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        this.startPage = 1;
        this.endPage = this.maxPages;
      } else if (
        this.currentPage + maxPagesAfterCurrentPage >=
        this.totalPages
      ) {
        // current page near the end
        this.startPage = this.totalPages - this.maxPages + 1;
        this.endPage = this.totalPages;
      } else {
        // current page somewhere in the middle
        this.startPage = this.currentPage - maxPagesBeforeCurrentPage;
        this.endPage = this.currentPage + maxPagesAfterCurrentPage;
      }
    }

    // create an array of pages to ng-repeat in the pager control
    this.pages = Array.from(
      Array(this.endPage + 1 - this.startPage).keys()
    ).map((i) => this.startPage || 0 + i);
  }
}
