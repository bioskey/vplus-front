import { Component, OnInit } from '@angular/core';
import { BusService } from '../../services/bus/bus.service';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeComponent } from '../time/time.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, TimeComponent, ReactiveFormsModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss'
})
export class ManagementComponent implements OnInit {
  allBus: any[] = [];
  showNewBus = false;
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private busService: BusService) { }

  ngOnInit(): void {
    this.initiateFormGroup();
    this.getAllBus();
  }

  initiateFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      busname: ['', Validators.required],
      places: ['', Validators.required],
      price: ['', Validators.required],
      availability: ['', Validators.required],
    });
  }

  getAllBus(): void {
    this.busService.getAllBus().subscribe(bus => {
      this.allBus = bus;
    });
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
  }
}
