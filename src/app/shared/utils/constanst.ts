import {environment} from '../../../environments/environment';

export const CONSTANST = {
    permissions: {},
    storageToken: {
      JWT_TOKEN: 'JWT_TOKEN',
      REFRESH_TOKEN: 'REFRESH_TOKEN',
      USER_INFO: 'USER_INFO'
    },
    routes: {
        authorization: {
            login: environment.api_url + 'auth/login',
            logout: environment.api_url + 'auth/logout',
            register: environment.api_url + 'auth/register',
            me: environment.api_url + 'auth/me',
            refreshToken: environment.api_url + 'auth/refresh-token',
        },
        person: {
            list: environment.api_url + '/api/person',
            delete: environment.api_url + '/api/person/delete/:id',
            save: environment.api_url + '/api/person/save',
            get: environment.api_url + '/api/person/:id'
        },
        user: {}
    },
    lang: {},
    session: {},
    parameters: {}
};
