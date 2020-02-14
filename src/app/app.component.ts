import {Component, OnInit} from '@angular/core';
import {Translations} from '@app/core/services/translation';
import {TranslateService} from '@ngx-translate/core';
import {IconService} from '@app/core/services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Todo';
  installEvent: any;
  showInstallBar = false;
  showInstallBarKey = '_app_install_prompt_1';

  constructor(
    private translateService: TranslateService,
    private iconService: IconService
  ) {
    this.translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.iconService.registerIcons();
  }

  closeInstallPrompt() {

    localStorage.setItem(this.showInstallBarKey, '1');
    this.installEvent = null;
  }
  installPwa(): void {
    this.installEvent.prompt();
  }

}
