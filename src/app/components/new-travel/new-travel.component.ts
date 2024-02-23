import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventTypes, ToastService } from '../../services/toast/toast.service';
import { TravelService } from '../../services/travel/travel.service';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search/search.service';
import { TimeComponent } from '../time/time.component';

@Component({
  selector: 'app-new-travel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TimeComponent],
  templateUrl: './new-travel.component.html',
  styleUrl: './new-travel.component.scss'
})
export class NewTravelComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private travelService: TravelService,
    private searchService: SearchService,
    private router: Router) { }

  formGroup!: FormGroup;

  get departure() {
    return this.formGroup.get('departure')!;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['M', Validators.required],
      email: [''],
      phonenumber: [''],
      typeId: [''],
      numberId: [''],
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      date: ['', Validators.required],
      hour: ['', Validators.required],
      bus: ['', Validators.required],
      places: ['15', Validators.required],
      amount: ['', Validators.required]
    });

    this.subscribeToSelectedTraveler();
  }

  onSubmit(): void {
    this.travelService.addTravel({
      firstname: this.formGroup.value.firstname,
      lastname: this.formGroup.value.lastname
    }).subscribe((travel) => {
      this.showSuccess(travel);
      this.router.navigate(['travels']);
    })
  }

  showSuccess(travel: any) {
    this.toastService.show({
      classname: 'bg-success text-light',
      delay: 10000,
      title: 'New travel',
      message: "New travel successfully recorded !",
      type: EventTypes.success
    });
  }

  subscribeToSelectedTraveler() {
    this.searchService.selectedTraveler.subscribe((person) => {
      if (!person) {
        return;
      }

      this.formGroup.patchValue({
        firstname: person.firstname,
        lastname: person.lastname
      })
    })
  }
}
