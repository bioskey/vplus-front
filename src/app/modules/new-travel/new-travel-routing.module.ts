import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTravelComponent } from '../../components/new-travel/new-travel.component';

const routes: Routes = [
  {
    path: '',
    component: NewTravelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewTravelRoutingModule { }