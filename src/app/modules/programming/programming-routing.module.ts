import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgrammingComponent } from '../../components/programming/programming.component';

const routes: Routes = [
  {
    path: '',
    component: ProgrammingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgrammingRoutingModule { }