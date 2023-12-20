import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-accepter',
  templateUrl: './accepter.component.html',
  styleUrls: ['./accepter.component.scss'],
})
export class AccepterComponent {
  @Output() accepter = new EventEmitter();
  @Input() info!: string;

  actionAccepter() {
    this.accepter.emit(true);
  }

  actionRefuser() {
    this.accepter.emit(false);
  }
}
