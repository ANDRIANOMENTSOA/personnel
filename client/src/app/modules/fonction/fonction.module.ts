import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FonctionRoutingModule } from './fonction-routing.module';
import { FonctionComponent } from './fonction/fonction.component';
import { ListeFonctionsComponent } from './liste-fonctions/liste-fonctions.component';
import { ShardModule } from 'src/app/shard/shard.module';
import { NgEventEunomiaModule } from 'ng-event-eunomia';

@NgModule({
  declarations: [FonctionComponent, ListeFonctionsComponent],
  imports: [
    CommonModule,
    FonctionRoutingModule,
    ShardModule,
    NgEventEunomiaModule,
  ],
})
export class FonctionModule {}
