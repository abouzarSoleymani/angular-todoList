import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ApiConfig} from './models/apiClient.model';
import {ServiceTool} from './service.tool';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient/*,
              private jwtService: JwtService*/) {
  }

  private static formatErrors(error: any): Observable<never> {
    console.log(error)
    return throwError(error.error);
  }

  private static getApiPath(relativePath) {

    return `${environment.api_url}${relativePath}`;
  }

  public get<T>(path: string, config?: ApiConfig): Observable<T> {
    return this.http.get(
      ServiceTool.api(path, config && config.login ? 'auth' : null),{headers: this.getHeaders(config)}
    ).pipe(map( (response: any) => ServiceTool.processResponse<T>(response)), catchError(ApiService.formatErrors));
  }



  public post<T>(path: string, body: any ,  config?: ApiConfig): Observable<T> {
    if (config && config.login) {
      const urlBody = 'grant_type=' + body.grant_type + '&username=' + body.username + '&password=' + body.password;
      return this.http.post<T>(
        ServiceTool.api(path, config && config.login ? 'auth' : null),
        urlBody,
        {headers: this.getHeaders(config)}
      ).pipe(catchError(ApiService.formatErrors));
    } else {
      return this.http.post<T>(
        ServiceTool.api(path, config && config.login ? 'auth' : null),
        body,
        {headers: this.getHeaders(config)}
      ).pipe(catchError(ApiService.formatErrors));
    }
  }


  public put<T>(path: string, body: object = {}): Observable<T> {

    return this.http.put<T>(
      ApiService.getApiPath(path),
      body
    ).pipe(catchError(ApiService.formatErrors));
  }

  public delete<T>(path): Observable<T> {

    return this.http.delete<T>(
      ApiService.getApiPath(path)
    ).pipe(catchError(ApiService.formatErrors));
  }

  public getHeaders(config?: ApiConfig) {
    // this.httpNative.setSSLCertMode('nocheck');
    // let headers = {};
    //
    // if (!config || !config.noAuth) {
    //     if (this.getAuthenticationToken()) {
    //         headers['Authorization'] = 'bearer ' + this.getAuthenticationToken();
    //     }
    // }
    // if (config && config.login === true) {
    //     headers['X-Requested-With'] = 'XMLHttpRequest';
    //     headers['Content-type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    //     headers['Authorization'] = 'Basic ' + btoa('Accounting:password');
    // } else {
    //     headers['Content-type'] = 'application/json';
    // }
    // return headers;

    let headers = new HttpHeaders();
    if (!config || !config.noAuth) {
      if (this.getAuthenticationToken()) {
        headers = headers.set('Authorization', 'Bearer ' + this.getAuthenticationToken());
      }
    }
    if (config && config.login === true) {
      // headers = headers.set('X-Requested-With', 'XMLHttpRequest');
      headers = headers.set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
      headers = headers.set('Authorization', 'Basic ' + btoa('Evaluation:password'));
    } else {
      headers = headers.set('Content-type', 'application/json');
    }
    console.log(headers);
    return headers;
  }

  public setAuthenticationToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  public getAuthenticationToken() {
    return localStorage.getItem('auth-token');
  }

  public removeAuthenticationToken() {
    return localStorage.removeItem('auth-token');
  }

}
