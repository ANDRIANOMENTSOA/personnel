import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeCongeComponent } from './demande-conge/demande-conge.component';
import { ListeCongeComponent } from './liste-conge/liste-conge.component';

const routes: Routes = [
  {
    path: '',
    component: DemandeCongeComponent,
  },
  {
    path: 'modifier/:id',
    component: DemandeCongeComponent,
  },
  {
    path: 'liste',
    component: ListeCongeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CongeRoutingModule {}
