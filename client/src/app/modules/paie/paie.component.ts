import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Paie } from 'src/app/core/interfaces/paie';
import { PaieService } from 'src/app/core/services/paie.service';
import { ShardModule } from 'src/app/shard/shard.module';
import { ListePaieComponent } from './liste-paie/liste-paie.component';

@Component({
  selector: 'app-paie',
  standalone: true,
  imports: [ShardModule, ListePaieComponent],
  templateUrl: './paie.component.html',
  styleUrl: './paie.component.scss',
})
export class PaieComponent {
  constructor(
    private paieService: PaieService,
    public translate: TranslateService,
    private toastr: ToastrService
  ) {}

  formPaie = this.paieService.form();
  refrechId = '';

  SavePaie(): void {
    const paie = this.formPaie.value;

    this.paieService.create(paie as Partial<Paie>).subscribe(
      (res) => {
        this.formPaie.reset();
        this.toastr.success(this.translateText('action.enregistree'));
        this.refrechId = res.id;
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(this.translateText(err.error.error.message));
      }
    );
  }

  translateText(text: string): string {
    return this.translate.instant(text);
  }
}
