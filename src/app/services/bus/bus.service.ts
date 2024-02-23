import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private _mockData = [
    { name: "1245", price: "6000", places: "50", availability: "scheduled", duration: "3 mois" },
    { name: "1246", price: "2500", places: "100", availability: "to program", duration: "X" },
    { name: "1247", price: "7000", places: "40", availability: "scheduled", duration: "12 mois" },
    { name: "1248", price: "4000", places: "70", availability: "unavailable", duration: "X" }
  ];

  getAllBus(): Observable<any[]> {
    return of(this._mockData);
  }

  getBusByName(name: string): Observable<any> {
    return of(this._mockData.filter(bus => bus.name === name));
  }

  updateBus(bus: string, duration: string): Observable<any[]> {
    this._mockData.forEach(data => {
      if (data.name === bus) {
        data.availability = "scheduled";
        data.duration = duration;
      }
    })

    return of(this._mockData);
  }
}
