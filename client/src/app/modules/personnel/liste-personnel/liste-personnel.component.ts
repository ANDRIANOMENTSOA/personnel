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
import { Personnel } from 'src/app/core/interfaces/personnel';
import { PersonnelService } from 'src/app/core/services/personnel.service';

@Component({
  selector: 'app-liste-personnel',
  templateUrl: './liste-personnel.component.html',
  styleUrls: ['./liste-personnel.component.scss'],
})
export class ListePersonnelComponent implements OnInit {
  displayedColumns = ['nom', 'prenom', 'email', 'fonction', 'action'];
  dataSource!: MatTableDataSource<Personnel>;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @Input() newId: string = '';

  constructor(
    private personnelService: PersonnelService,
    private toastr: ToastrService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.dataSource = new MatTableDataSource<Personnel>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newId']) {
      this.getPersonnel();
    }
  }

  ngOnInit(): void {
    this.getPersonnel();
  }

  getPersonnel() {
    this.personnelService
      .find({
        include: [{ relation: 'fonction' }],
      })
      .subscribe(
        (data) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = function (
            data: Personnel,
            filter: string
          ): boolean {
            return (
              data.nom?.toLowerCase().includes(filter) ||
              data.prenom?.toLowerCase().includes(filter) ||
              data.email?.toLowerCase().includes(filter)
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
    this.router.navigate(['personnel', 'modifier', id]);
  }

  supprimer(confirm: boolean, id: string) {
    if (confirm) {
      this.personnelService.deleteById(id).subscribe(() => {
        this.toastr.error(this.translate.instant('action.supprime'));
        this.getPersonnel();
        this.router.navigate(['personnel']);
      });
    }
  }
}
