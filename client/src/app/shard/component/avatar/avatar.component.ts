import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AssetService } from 'src/app/core/services/asset.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit {
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() avatarAssetId!: string | null;
  @Input() psedo!: string;
  @Input() readOnly = false;
  @Input() control!: FormControl;

  defaultImage = '../../../assets/images/defaul-profil-white.png';
  urlAvatar: string = this.defaultImage;
  triagram!: string;
  showImageAvatar = true;

  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;

  constructor(private assetService: AssetService) {}
  ngOnInit(): void {
    this.showAvatar();
  }

  showAvatar() {
    if (this.avatarAssetId) {
      this.urlAvatar = this.assetService.assetUrl(this.avatarAssetId);
    } else if (this.psedo) {
      this.showImageAvatar = false;
      this.triagram = this.psedo.slice(0, 3);
    }
   if (!this.control?.value) {
      this.control?.setValue(null);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['avatarAssetId'] || changes['psedo']) {
      this.showAvatar();
    }
  }

  uploadAvatar() {
    if (!this.readOnly) {
      this.fileUpload?.nativeElement.click();
    }
  }

  upload(): void {
    if (this.readOnly) {
      this.fileUpload?.nativeElement.click();
    }
  }
  onFileSelected(event: any): void {
    const file = (
      event.dataTransfer ? event.dataTransfer.files : event.target.files
    )[0];
    // preview Image
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.urlAvatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    this.assetService.upload(file).subscribe((file) => {
      this.showImageAvatar = true;
      if (this.control) {
        this.control.setValue(file.id);
      }
    });
  }
}
