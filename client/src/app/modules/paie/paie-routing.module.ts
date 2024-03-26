import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaieComponent } from './paie.component';
import { ListePaieComponent } from './liste-paie/liste-paie.component';

const routes: Routes = [
  {
    path: '',
    component: PaieComponent,
  },
  {
    path: 'modifier/:id',
    component: PaieComponent,
  },
  {
    path: 'listes',
    component: ListePaieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaieRoutingModule {}
