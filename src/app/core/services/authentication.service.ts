import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ApiService} from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
   private static login = 'oauth/token';
   private authenticationToken: string;

    constructor(private apiService: ApiService,
                private router: Router) {
    }

    public login(body): Observable<any> {
        const param = {
            grant_type: 'password',
            username: body.username,
            password: body.password
        };
      console.log(param)
        return this.apiService.post(AuthenticationService.login, param, {
          login: true,
          noAuth: true
        });
    }


  public logout(): Promise<any> | any {
    return this.apiService.removeAuthenticationToken();
  }

  public isLoggedIn(): boolean {
    return !!this.apiService.getAuthenticationToken();
  }
}
