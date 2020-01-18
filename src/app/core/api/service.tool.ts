import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {ApiService} from './api.service';

export class ServiceTool {

    constructor() {
    }

    public static api(relative: string, type?: string) {
        if (type) {
            if (type === 'auth') {
                return environment.auth_api_url + relative;
            }
        }
        return environment.api_url + relative;
    }

    public static processResponse<T>(response: any) {
        let jsonResp;
        try {
          jsonResp = JSON.parse(response);
          console.log(jsonResp)
          return jsonResp;
        } catch (e) {
            return response;
        }
    }

    public static processError(error: HttpErrorResponse, router: Router, apiClient: ApiService, onAuth: boolean) {
        // @ts-ignore
        // error.error = JSON.parse(error.error);
        if (!onAuth) {
            if (error.status === 401) {
                window.location.href = '/';
                apiClient.removeAuthenticationToken();
            }
        }
        console.log(error);
        return throwError(error);
    }
}
