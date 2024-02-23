import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from '../../services/search/search.service';
import { delay, distinctUntilChanged, finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-traveler',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './search-traveler.component.html',
  styleUrl: './search-traveler.component.scss'
})
export class SearchTravelerComponent {

  public result: any[] = [];
  public loading = false;

  constructor(private searchService: SearchService, private router: Router) { }

  search(keyword: string) {
    if (keyword.length < 3) {
      return;
    }

    this.loading = true;
    this.searchService.searchTravelers(keyword).pipe(
      distinctUntilChanged(),
      delay(1000),
      finalize(() => this.loading = false)
    ).subscribe(travelers => {
      this.result = travelers;
    });
  }

  select(person: any): void {
    this.searchService.selectTraveler(person);
    this.router.navigate(['new-travel']);
  }

  trackByFn(person: any) {
    return person.firstname + person.lastname;
  }
}
