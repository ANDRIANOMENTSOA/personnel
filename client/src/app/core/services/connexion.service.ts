import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

export interface motdepasse {
  id: string;
  password: string;
  password2: string;
}
export interface Credentials {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  constructor(private http: HttpClient) {}

  rootPath = 'authenticate/';

  formConnexion() {
    return new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', Validators.required),
    });
  }

  formResetPassword() {
    return new UntypedFormGroup({
      password: new UntypedFormControl('', [Validators.required]),
      password2: new UntypedFormControl('', Validators.required),
    });
  }

  connexion(credentials: Credentials) {
    return this.http.post<any>(this.rootPath + 'connexion', credentials);
  }
  creeMotdePasse(motdepasse: motdepasse) {
    return this.http.post(
      environment.apiBaseUrl + this.rootPath + 'change',
      motdepasse
    );
  }
}
