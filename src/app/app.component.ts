import { Component } from '@angular/core';
import {Translations} from '@app/core/services/translation';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bootcamp';
  constructor(
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('en');
  }

}
