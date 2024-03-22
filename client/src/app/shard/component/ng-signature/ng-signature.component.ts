import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import SignaturePad from 'signature_pad';
import { ShardModule } from '../../shard.module';

@Component({
  selector: 'app-ng-signature',
  standalone: true,
  imports: [ShardModule],
  templateUrl: './ng-signature.component.html',
  styleUrl: './ng-signature.component.scss',
})
export class NgSignatureComponent implements OnInit {
  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;

  @Output() done = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.done.emit(base64Data);
  }
}
