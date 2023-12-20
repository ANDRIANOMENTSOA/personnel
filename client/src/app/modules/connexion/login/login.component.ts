import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnexionService } from 'src/app/core/services/connexion.service';
import { PersonnelService } from 'src/app/core/services/personnel.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.connexionService.formConnexion();

  constructor(
    private route: Router,
    private connexionService: ConnexionService,
    private personnelService: PersonnelService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  connexion() {
    this.connexionService.connexion(this.form.value).subscribe(
      (res) => {
        if (res) {
          sessionStorage.setItem('access_token', res.token);
          sessionStorage.setItem('id', res.id);
          this.route.navigate(['conge']);
        }
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.error.error.message);
      }
    );
  }

  motdepassOublie() {
    const form = this.form.value;
    this.personnelService
      .findOne({ where: { email: form.email } })
      .subscribe((personnel) => {
        console.log('personnel', personnel);
        if (personnel) {
          this.route.navigate(['connexion', 'reset', personnel.id]);
        } else {
          this.toastr.error(
            'Aucun compte trouvé avec e-mail' + ' ' + form.email
          );
        }
      });
  }
}
