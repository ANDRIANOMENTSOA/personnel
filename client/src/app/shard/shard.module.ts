import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { LangueComponent } from './component/langue/langue.component';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { BoutonSupprimerComponent } from './component/bouton-supprimer/bouton-supprimer.component';
import { TelechargerComponent } from './component/telecharger/telecharger.component';
import { AccepterComponent } from './component/accepter/accepter.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AvatarComponent } from './component/avatar/avatar.component';

@NgModule({
  declarations: [
    LangueComponent,
    BoutonSupprimerComponent,
    TelechargerComponent,
    AccepterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatSidenavModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatNativeDateModule,
    TranslateModule.forChild(),
    ToastrModule,
    MatPaginatorModule,
    MatMenuModule,
    MatRadioModule,
    AvatarComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatSidenavModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatNativeDateModule,
    TranslateModule,
    LangueComponent,
    ToastrModule,
    MatPaginatorModule,
    MatMenuModule,
    BoutonSupprimerComponent,
    TelechargerComponent,
    AccepterComponent,
    MatRadioModule,
    AvatarComponent
  ],
})
export class ShardModule {}
