import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private _mockData = [
    { firstname: "Cedric", lastname: "DEFER" },
    { firstname: "Clauther", lastname: "MGUIMNANG" },
    { firstname: "Marius", lastname: "MONTHE" },
    { firstname: "Antoine", lastname: "NOGOUP" },
    { firstname: "Victoire", lastname: "IRENGUE" }
  ];

  getDayTravels(): Observable<any[]> {
    return of(this._mockData);
  }

  addTravel(travel: any): Observable<any>{
    this._mockData.unshift({
      firstname: travel.firstname,
      lastname: travel.lastname
    })

    return of(travel);
  }
}
