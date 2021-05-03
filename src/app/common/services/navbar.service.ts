import { Injectable } from '@angular/core';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class NavbarService extends SearchService {
  constructor() {
    super();
    this.visible = true;
  }
}
