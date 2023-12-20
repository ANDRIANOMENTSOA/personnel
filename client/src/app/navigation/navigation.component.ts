import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ReglageService } from '../core/services/reglage.service';
import { Reglage } from '../core/interfaces/reglage';
import { AuthenticationService } from '../core/services/authentication.service';
import { PersonnelService } from '../core/services/personnel.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  reglage!: Reglage;
  direction = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private reglageService: ReglageService,
    private authenticationService: AuthenticationService,
    private personnelService: PersonnelService
  ) {}

  ngOnInit() {
    const idPersonnel = sessionStorage.getItem('id');
    if (idPersonnel) {
      this.personnelService.findById(idPersonnel).subscribe((personnel) => {
        this.direction = personnel.direction;
      });
    }
    this.reglageService.find().subscribe((res) => {
      this.reglage = res[0];
    });
  }

  deconnexion() {
    this.authenticationService.doLogout();
  }
}
