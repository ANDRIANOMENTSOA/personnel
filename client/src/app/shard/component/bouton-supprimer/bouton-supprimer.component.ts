import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bouton-supprimer',
  templateUrl: './bouton-supprimer.component.html',
  styleUrls: ['./bouton-supprimer.component.scss'],
})
export class BoutonSupprimerComponent {
  @Output() confirmation = new EventEmitter();
  @Input() info!: string;

  actionOui() {
    this.confirmation.emit(true);
  }

  actionNon() {
    this.confirmation.emit(false);
  }
}
