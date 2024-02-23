import { Component } from '@angular/core';
import { BusService } from '../../services/bus/bus.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventTypes, ToastService } from '../../services/toast/toast.service';
import { startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TimeComponent } from '../time/time.component';

@Component({
  selector: 'app-programming',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TimeComponent],
  templateUrl: './programming.component.html',
  styleUrl: './programming.component.scss'
})
export class ProgrammingComponent {
  formGroup!: FormGroup;
  checkboxes = [
    {
      name: 'Monday',
      value: 'value-1'
    }, {
      name: 'Tuesday',
      value: 'value-2'
    }, {
      name: 'Wenesday',
      value: 'value-3'
    },
    {
      name: 'Thursday',
      value: 'value-4'
    }, {
      name: 'Friday',
      value: 'value-5'
    }, {
      name: 'Saturday',
      value: 'value-6'
    }, {
      name: 'Sunday',
      value: 'value-7'
    }
  ];

  get daysControl() {
    return this.formGroup.get('days')!;
  }

  get frequencyControl() {
    return this.formGroup.get('frequency')!;
  }

  get busControl() {
    return this.formGroup.get('name')!;
  }

  constructor(private busService: BusService, private formBuilder: FormBuilder, private toastService: ToastService) { }

  ngOnInit(): void {
    this.initializeFromgroup();
    this.subscribeToBusControl();
    this.subscribeToDaysControl();
    this.subscribeToFrequencyControl();
  }

  initializeFromgroup(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      places: ['', Validators.required],
      price: ['', Validators.required],
      departure: ['M', Validators.required],
      arrival: [''],
      frequency: ['CHOOSE'],
      days: this.formBuilder.array(this.checkboxes.map(x => false), Validators.required),
      hour: [''],
      duration: ['', Validators.required],
    });
  }

  subscribeToDaysControl(): void {
    this.daysControl.valueChanges.pipe(startWith(() => this.daysControl.value)).subscribe(() => {
      this.daysControl.setValue(
        this.daysControl.value.map((value: string, i: number) => value ? this.checkboxes[i].value : false),
        { emitEvent: false }
      );
    });
  }

  subscribeToFrequencyControl(): void {
    this.frequencyControl.valueChanges.pipe(startWith(() => this.frequencyControl.value)).subscribe((value: string) => {
      if (value === 'ALL') {
        this.daysControl.setValue(this.daysControl.value.map(() => true));
        this.daysControl.disable();

      } else {
        this.daysControl.setValue(this.daysControl.value.map(() => false));
        this.daysControl.enable();
      }
    });
  }

  subscribeToBusControl(): void {
    this.busControl.valueChanges.subscribe((bus: string | undefined) => {
      if (bus === undefined || null) {
        return;
      }

      this.busService.getBusByName(bus).subscribe(bus => {
        this.formGroup.patchValue({
          places: bus[0].places,
          price: bus[0].price
        })
      })
    });
  }

  onSubmit(): void {
    const formValue = {
      ...this.formGroup.value,
      days: this.daysControl.value.filter((value: string) => !!value)
    }

    this.busService.updateBus(formValue.name, formValue.duration).subscribe(results => {
      this.toastService.show({
        classname: 'bg-success text-light',
        delay: 10000,
        title: 'Programing',
        message: "Bus was successful programmed !",
        type: EventTypes.success
      });
      this.initializeFromgroup();
      window.scroll({top: 0});
    })
  }
}
