import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  Input,
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
import { Conge } from 'src/app/core/interfaces/conge';
import { AssetService } from 'src/app/core/services/asset.service';
import { CongeService } from 'src/app/core/services/conge.service';

@Component({
  selector: 'app-liste-conge',
  templateUrl: './liste-conge.component.html',
  styleUrls: ['./liste-conge.component.scss'],
})
export class ListeCongeComponent implements OnInit {
  displayedColumns = ['nom', 'debut', 'fin', 'fonction', 'statut', 'action'];
  dataSource!: MatTableDataSource<Conge>;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @Input() newId: string = '';
  @Input() personnelId: string | null | undefined;
  utilisateurEncour = sessionStorage.getItem('id');

  constructor(
    private congeService: CongeService,
    private toastr: ToastrService,
    private router: Router,
    private translate: TranslateService,
    private assetService: AssetService
  ) {
    this.dataSource = new MatTableDataSource<Conge>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newId']) {
      this.getConge();
    }
  }

  ngOnInit(): void {
    this.getConge();
  }

  getConge() {
    const include = [
      {
        relation: 'personnel',
        scope: {
          include: [{ relation: 'fonction', scope: { order: ['nom DESC'] } }],
        },
      },
    ];
    const listeConge = this.personnelId
      ? this.congeService.find({
          where: { personnelId: this.personnelId },
          include,
        })
      : this.congeService.find({
          include,
        });

    listeConge.subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = function (
          data: Conge,
          filter: string
        ): boolean {
          return (
            data.statut?.toLowerCase().includes(filter) ||
            data.personnel?.nom?.toLowerCase().includes(filter) ||
            data.personnel?.prenom?.toLowerCase().includes(filter) ||
            data.personnel?.fonction.nom?.toLowerCase().includes(filter)
          );
        };
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.toastr.error(this.translate.instant('general.problemeServeur'));
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  modifier(id: string) {
    this.router.navigate(['conge', 'modifier', id]);
  }

  supprimer(confirm: boolean, id: string) {
    if (confirm) {
      this.congeService.deleteById(id).subscribe(() => {
        this.toastr.error(this.translate.instant('action.supprime'));
        this.getConge();
        this.router.navigate(['conge']);
      });
    }
  }

  telecharger(assetId: string) {
    this.assetService.telechargeFichier(assetId);
  }

  actionConge(accepter: boolean, id: string) {
    if (accepter) {
      this.congeService.congeAccept(id).subscribe(() => {
        this.toastr.success(this.translate.instant('conge.Accepte'));
        this.ngOnInit();
      });
    } else {
      this.congeService.congeRefuser(id).subscribe(() => {
        this.toastr.error(this.translate.instant('conge.Refuse'));
        this.ngOnInit();
      });
    }
  }
}
