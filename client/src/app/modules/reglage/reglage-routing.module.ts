import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglageComponent } from './reglage/reglage.component';

const routes: Routes = [
  {
    path: '',
    component: ReglageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReglageRoutingModule {}
