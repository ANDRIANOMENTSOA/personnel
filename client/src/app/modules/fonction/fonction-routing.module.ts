import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FonctionComponent } from './fonction/fonction.component';
import { ListeFonctionsComponent } from './liste-fonctions/liste-fonctions.component';

const routes: Routes = [
  {
    path: '',
    component: FonctionComponent,
  },
  {
    path: 'modifier/:id',
    component: FonctionComponent,
  },
  {
    path: 'listes',
    component: ListeFonctionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FonctionRoutingModule {}
