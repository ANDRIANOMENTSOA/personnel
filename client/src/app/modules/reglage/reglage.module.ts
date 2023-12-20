import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReglageRoutingModule } from './reglage-routing.module';
import { ReglageComponent } from './reglage/reglage.component';
import { ShardModule } from 'src/app/shard/shard.module';

@NgModule({
  declarations: [ReglageComponent],
  imports: [CommonModule, ReglageRoutingModule, ShardModule],
})
export class ReglageModule {}
