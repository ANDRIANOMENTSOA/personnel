import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyObject } from '@loopback/filter/dist/types';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Asset } from '../interfaces/asset';
import { GenericCrudService } from './generic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class AssetService extends GenericCrudService<Asset> {
  rootPath = 'assets/';

  constructor(protected http: HttpClient, private toastr: ToastrService) {
    super();
  }

  checkPdfFile(type: string) {
    return true;
  }

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<Asset[]>(this.rootPath, formData)
      .pipe(map((assets) => assets[0]));
  }

  telechargeFichier(assetId: string, attachment?: string) {
    /*const query = attachment ? '?attachment=' + attachment : '';
    if (top) {
      top.location.href =
        environment.apiBaseUrl + this.rootPath + assetId + '/download' + query;
    }*/
    window.open(
      environment.apiBaseUrl + this.rootPath + assetId + '/download',
      '_blank'
    );
    return;
  }

  assetUrl(assetId: string) {
    return environment.apiBaseUrl + this.rootPath + assetId + '/download';
  }

  copyFichier(assetId: string) {
    return this.http.post<Asset>(
      environment.apiBaseUrl + this.rootPath + assetId + '/copy',
      {}
    );
  }

  errorFileType(type: string) {
    return;
  }

  checkImage(type: string) {
    return type === 'image/png' || type === 'image/jpeg';
  }

  errorImage() {
    this.toastr.error('ErrorUploadImage');
  }
}
