// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  name: 'local',
  production: false,
  api_url: '/api/',
  auth_api_url: 'http://devapp01.icico.net.ir/',
  api_username: 'devadmin',
  api_password: 'password',
  evaluation_version: '1',
  google_tag_manager_id: '',
  service_worker: false,
  evaluation_app_download_link: 'https://app.nicico.com/1?fallback=https://evaluation-app.com/download.html',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
