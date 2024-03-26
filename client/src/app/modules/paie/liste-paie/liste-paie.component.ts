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
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Paie } from 'src/app/core/interfaces/paie';
import { PaieService } from 'src/app/core/services/paie.service';
import { ShardModule } from 'src/app/shard/shard.module';

@Component({
  selector: 'app-liste-paie',
  standalone: true,
  imports: [ShardModule],
  templateUrl: './liste-paie.component.html',
  styleUrl: './liste-paie.component.scss',
})
export class ListePaieComponent implements OnInit, OnChanges {
  displayedColumns = ['mois'];
  dataSource!: MatTableDataSource<Paie>;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @Input() newId: string = '';

  constructor(
    private paieService: PaieService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.dataSource = new MatTableDataSource<Paie>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newId']) {
      this.getPaie();
    }
  }

  ngOnInit(): void {
    this.getPaie();
  }

  getPaie() {
    this.paieService.find({ order: ['mois DESC'] }).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = function (
          data: Paie,
          filter: string
        ): boolean {
          return data.mois?.toLowerCase().includes(filter);
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

  translateText(text: string): string {
    return this.translate.instant(text);
  }
}
