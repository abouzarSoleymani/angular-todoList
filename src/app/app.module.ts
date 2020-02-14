import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from './core/services/message.service';
import {AuthInterceptor} from './core/services/authconfig.interceptor';
import { LayoutComponent } from './components/layout/layout.component';
import {MainModule} from './main/main.module';
import {ContentModule} from './components/content/content.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {Translations} from '@app/core/services/translation';
import {from} from 'rxjs';
import {pluck} from 'rxjs/operators';
import {FooterModule} from '@app/components/footer/footer.module';
import {NavbarComponent} from '@app/components/navbar/navbar.component';
import {NavbarModule} from '@app/components/navbar/navbar.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {SplashComponent} from '@app/components/splash/splash.component';

// Core.module
export class WebpackTranslateLoader implements TranslateLoader {
  getTranslation(lang: string) {
    return from(import(`../assets/i18n/${lang}.ts`)).pipe(pluck('default'));
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MainModule,
    ContentModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader
      }
    }),
    NavbarModule,
    FooterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageService,
    Translations
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
