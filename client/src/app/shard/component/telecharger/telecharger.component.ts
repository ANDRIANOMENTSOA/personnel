import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AssetService } from 'src/app/core/services/asset.service';

@Component({
  selector: 'app-telecharger',
  templateUrl: './telecharger.component.html',
  styleUrls: ['./telecharger.component.scss'],
})
export class TelechargerComponent implements OnInit {
  @Input() acceptFile = 'application/pdf';
  @Output() fileId = new EventEmitter();
  @Input() afficheTitre = true;

  @Output() fileAndBase64 = new EventEmitter();

  constructor(public assetsService: AssetService) {}
  ngOnInit(): void {}

  // File
  @ViewChild('fileUpload')
  fileUpload: ElementRef | undefined;
  file: File | undefined;

  uploadFile() {
    this.fileUpload?.nativeElement.click();
  }

  onFileSelected(event: any) {
    const files = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;
    this.file = files[0];
    this.assetsService.upload(files[0]).subscribe(
      (res) => {
        console.log('res', res);
        this.fileId.emit(res[0].id);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  supprimer() {
    this.fileId.emit(null);
    this.file = undefined;
  }
}
