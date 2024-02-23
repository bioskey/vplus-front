import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelsComponent } from '../../components/travels/travels.component';

const routes: Routes = [
  {
    path: '',
    component: TravelsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelsRoutingModule { }
