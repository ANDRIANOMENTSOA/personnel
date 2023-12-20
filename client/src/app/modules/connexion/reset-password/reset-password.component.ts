import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  ConnexionService,
  motdepasse,
} from 'src/app/core/services/connexion.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  form = this.connexionService.formResetPassword();
  constructor(
    private connexionService: ConnexionService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private route: Router
  ) {}

  titre = 'Créer un mot de passe';

  resetPassword() {
    const value = this.form.value;
    if (value.password === value.password2) {
      const pass: motdepasse = {
        id: this.router.snapshot.params['id'],
        password: value.password,
        password2: value.password,
      };
      this.connexionService.creeMotdePasse(pass).subscribe(
        () => {
          this.toastr.success('Mot de passe enregistré');
          this.route.navigate(['connexion']);
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(err.error.error.message);
        }
      );
    } else {
      this.toastr.error('Le mot de passe doit être le même');
    }
  }
}
