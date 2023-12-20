import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelRoutingModule } from './personnel-routing.module';
import { PersonnelComponent } from './personnel/personnel.component';
import { ListePersonnelComponent } from './liste-personnel/liste-personnel.component';
import { ShardModule } from 'src/app/shard/shard.module';
import { CompteComponent } from './compte/compte.component';
import { SignatureComponent } from './signature/signature.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SignaturePadModule } from '@ng-plus/signature-pad';

@NgModule({
  declarations: [
    PersonnelComponent,
    ListePersonnelComponent,
    CompteComponent,
    SignatureComponent,
  ],
  imports: [
    CommonModule,
    PersonnelRoutingModule,
    ShardModule,
    SignaturePadModule,
    MatDialogModule,
  ],
})
export class PersonnelModule {}
