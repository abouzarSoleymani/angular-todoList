import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/core/services/auth.service';
import {Translations} from '@app/core/services/translation';
import {TranslateService} from '@ngx-translate/core';
import {LanguagesModel} from '@app/core/models/languages.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  param = { value: 'my website' };
  selectedLanguage;
  languages: LanguagesModel[] = [
    {id: 'en' , title: 'English', flag: 'en'},
    {id: 'fa' , title: 'Persian', flag: 'fa'}
  ];
  constructor(public authService: AuthService,
              public translations: Translations,
              public translateService: TranslateService) {

  }

  ngOnInit() {
    this.selectedLanguage = 'en';
  }
  changeLanguage(language: string): void {
    console.log(language)
    this.translateService.use(language);
  }
  logoutUser() {
    this.authService.logout().subscribe(data => console.log(data))
  }
}
