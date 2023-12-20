import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutguardGuard } from './core/autguard.guard';
import { FonctionModule } from './modules/fonction/fonction.module';
import { PersonnelModule } from './modules/personnel/personnel.module';
import { ReglageModule } from './modules/reglage/reglage.module';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  {
    path: 'connexion',
    loadChildren: () =>
      import('./modules/connexion/connexion.module').then(
        (md) => md.ConnexionModule
      ),
  },
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AutguardGuard],
    children: [
      {
        path: 'conge',
        loadChildren: () =>
          import('./modules/conge/conge.module').then((md) => md.CongeModule),
        canActivate: [AutguardGuard],
      },
      {
        path: 'personnel',
        loadChildren: () => PersonnelModule,
        canActivate: [AutguardGuard],
      },
      {
        path: 'fonction',
        loadChildren: () => FonctionModule,
        canActivate: [AutguardGuard],
      },
      {
        path: 'reglage',
        loadChildren: () => ReglageModule,
        canActivate: [AutguardGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
