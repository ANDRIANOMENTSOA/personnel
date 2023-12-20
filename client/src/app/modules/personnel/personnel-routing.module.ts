import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompteComponent } from './compte/compte.component';
import { PersonnelComponent } from './personnel/personnel.component';

const routes: Routes = [
  {
    path: '',
    component: PersonnelComponent,
  },
  {
    path: 'modifier/:id',
    component: PersonnelComponent,
  },
  {
    path: 'compte',
    component: CompteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonnelRoutingModule {}
