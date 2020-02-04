import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import {catchError, map, mapTo, tap} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel as User} from '@app/core/models/user.model';
import {TokenModel} from '@app/core/models/token.model';
import {CONSTANST} from '@app/shared/utils/constanst';
import {ApiResponseModel} from '@app/core/models/api.response.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedUser: string;

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // register
  register(user: User): Observable<any> {
    let api = `${CONSTANST.routes.authorization.register}`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // log-in
  login(user: User) {
    return this.http.post<any>(`${CONSTANST.routes.authorization.login}`, user).pipe(
      catchError(this.handleError)
    ).subscribe((res: any) => {
        this.doLoginUser(user.email, res);
        this.getUserProfile().subscribe((res) => {
          this.currentUser = res;
          this.storeUserInfo(res);
          this.router.navigate(['/'])
        })
      })
  }


  logout() {
    return this.http.get<any>(`${CONSTANST.routes.authorization.logout}`).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  // User profile
  getUserProfile(): Observable<any> {
    let api = `${CONSTANST.routes.authorization.me}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: ApiResponseModel) => {
        return res.data || {}
      }),
      catchError(this.handleError)
    )
  }



  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${CONSTANST.routes.authorization.refreshToken}`, {
      'token': this.getRefreshToken()
    }).pipe(tap((tokens: TokenModel) => {
      this.storeJwtToken(tokens.token);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(CONSTANST.storageToken.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: TokenModel) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(CONSTANST.storageToken.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(CONSTANST.storageToken.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: TokenModel) {
    localStorage.setItem(CONSTANST.storageToken.JWT_TOKEN, tokens.token);
    localStorage.setItem(CONSTANST.storageToken.REFRESH_TOKEN, tokens.refreshToken);
  }
  public getUserInfo() {
    return JSON.parse(localStorage.getItem(CONSTANST.storageToken.USER_INFO));
  }
  private storeUserInfo(userInfo: User) {
    localStorage.setItem(CONSTANST.storageToken.USER_INFO, JSON.stringify(userInfo));
  }
  private removeTokens() {
    localStorage.removeItem(CONSTANST.storageToken.JWT_TOKEN);
    localStorage.removeItem(CONSTANST.storageToken.REFRESH_TOKEN);
    localStorage.removeItem(CONSTANST.storageToken.USER_INFO);
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
