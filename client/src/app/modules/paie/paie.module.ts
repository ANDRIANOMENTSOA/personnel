import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaieRoutingModule } from './paie-routing.module';
import { ShardModule } from 'src/app/shard/shard.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaieRoutingModule,
    ShardModule
  ]
})
export class PaieModule { }
