import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-langue',
  templateUrl: './langue.component.html',
  styleUrls: ['./langue.component.scss'],
})
export class LangueComponent {
  constructor(private translate: TranslateService) {}

  langue = [
    {
      key: 'fr',
      description: 'Français',
    },
    {
      key: 'en',
      description: 'Anglais',
    },
  ];

  changeLanuge(value: string) {
    this.translate.use(value);
  }
}
