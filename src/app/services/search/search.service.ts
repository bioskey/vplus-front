import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _mockData = [
    { firstname: "Cedric", lastname: "DEFER" },
    { firstname: "Clauther", lastname: "MGUIMNANG" },
    { firstname: "Marius", lastname: "MONTHE" },
    { firstname: "Antoine", lastname: "NOGOUP" },
    { firstname: "Victoire", lastname: "IRENGUE" }
  ];

  private _selectedTraveler = new Subject<any>();
  selectedTraveler: Observable<any>;

  constructor() {
    this.selectedTraveler = this._selectedTraveler.asObservable();
  }

  searchTravelers(keyword: string): Observable<any[]>{
    return of(this._mockData.filter((person => {
      return person.firstname.toLowerCase().startsWith(keyword.toLowerCase())
      || person.lastname.toLowerCase().startsWith(keyword.toLowerCase())
    })));
  }

  selectTraveler(traveler: any) {
    this._selectedTraveler.next(traveler);
  }
}
