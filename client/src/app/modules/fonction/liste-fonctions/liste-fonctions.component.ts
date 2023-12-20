import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Fonction } from 'src/app/core/interfaces/fonction';
import { FonctionService } from 'src/app/core/services/fonction.service';

@Component({
  selector: 'app-liste-fonctions',
  templateUrl: './liste-fonctions.component.html',
  styleUrls: ['./liste-fonctions.component.scss'],
})
export class ListeFonctionsComponent implements OnInit, OnChanges {
  displayedColumns = ['nom', 'action'];
  dataSource!: MatTableDataSource<Fonction>;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @Input() newId: string = '';

  constructor(
    private fonctionService: FonctionService,
    private toastr: ToastrService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.dataSource = new MatTableDataSource<Fonction>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newId']) {
      this.getFunction();
    }
  }

  ngOnInit(): void {
    this.getFunction();
  }

  getFunction() {
    this.fonctionService.find({order: ['nom DESC']}).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = function (
          data: Fonction,
          filter: string
        ): boolean {
          return data.nom?.toLowerCase().includes(filter);
        };
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.toastr.error(this.translateText('general.problemeServeur'));
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  modifier(id: string) {
    this.router.navigate(['fonction', 'modifier', id]);
  }

  supprimer(confirm: boolean, id: string) {
    if (confirm) {
      this.fonctionService.deleteById(id).subscribe(
        () => {
          this.toastr.error(this.translateText('action.supprime'));
          this.getFunction();
          this.router.navigate(['fonction']);
        },
        (err: HttpErrorResponse) => {
          console.error(err.error.error.message);
          this.toastr.error(this.translateText(err.error.error.message));
        }
      );
    }
  }

  translateText(text: string): string {
    return this.translate.instant(text);
  }
}
