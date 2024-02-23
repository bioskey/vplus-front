import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { TravelService } from '../../services/travel/travel.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeComponent } from '../time/time.component';

@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, TimeComponent],
  templateUrl: './travels.component.html',
  styleUrl: './travels.component.scss'
})
export class TravelsComponent implements OnInit {

  constructor(private travelService: TravelService) { }

  travels: any[] = [];

  ngOnInit(): void {
    this.travelService.getDayTravels().subscribe((data) => {
      this.travels = data;
    })
  }
}
