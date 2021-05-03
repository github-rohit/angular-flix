import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface SearchEventValue {
  type: string;
  text: string;
}

@Component({
  selector: 'flix-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input('type') type: string;
  @Input('searchText') searchText: string;

  constructor(private router: Router) {
    this.type = this.type || 'text';
    this.searchText = this.searchText || '';
  }

  ngOnInit(): void {}

  onSearch(searchText: string) {
    this.router.navigate([], {
      queryParams: {
        [this.type]: searchText,
      },
    });
  }
}
