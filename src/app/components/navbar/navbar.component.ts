import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/core/services/auth.service';
import {Translations} from '@app/core/services/translation';
import {TranslateService} from '@ngx-translate/core';
import {LanguagesModel} from '@app/core/models/languages.model';
import {DatePipe, formatDate} from '@angular/common';
import {JdatePipe} from 'ngx-persian';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [JdatePipe]
})
export class NavbarComponent implements OnInit {
  myDate: any = Date.now();
  time;
  userInfo;
  param = { value: 'my website' };
  selectedLanguage;
  languages: LanguagesModel[] = [
    {id: 'en' , title: 'English', flag: 'en'},
    {id: 'fa' , title: 'Persian', flag: 'fa'}
  ];
  constructor(public authService: AuthService,
              public translations: Translations,
              public translateService: TranslateService,
              private router: Router) {
    setInterval(() => {
      this.time = Date.now();
    }, 1);
  }

  ngOnInit() {
    this.selectedLanguage = 'en';
    this.authService.userInfoSubject.subscribe(data => this.userInfo = data)
  }
  changeLanguage(language: string): void {
    console.log(language)
    this.translateService.use(language);
  }
  logoutUser() {
    this.authService.logout().subscribe(data => {
      console.log(data)
      this.router.navigate(['/auth/login'])
    })
  }
}
