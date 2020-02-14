import {ApplicationRef, Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {catchError, first, mapTo, switchMap, timeout} from 'rxjs/operators';
import {interval, Observable, of, timer} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MessageService} from '@app/core/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  constructor(  private appRef: ApplicationRef,
                private swUpdate: SwUpdate,
                private messageService: MessageService,
                private matSnack: MatSnackBar) {
    if (this.swUpdate.isEnabled) {
      this.appRef.isStable.pipe(
        first(isStable => isStable === true),
        switchMap(() => this.swUpdate.available),
      ).subscribe(() => {
        this.matSnack.open('new release of application', 'update', {
          // duration: 5000,
        }).afterDismissed().subscribe(result => {

          if (result.dismissedByAction) {

            this.swUpdate.activateUpdate().then(() => {

              this.messageService.showMessage('updated ...');
              document.location.reload();
            }).catch(e => {
              console.error(e);
            });
          }
        });
      });
    } else {
      console.log('browser does not  support service worker');
    }
  }

  checkForUpdate(): Observable<boolean> {
    const waitFor = 1000;
    if (this.swUpdate.isEnabled) {   //current browser supports service workers
      const available$ = this.swUpdate.available.pipe(
        mapTo(true),
        timeout(waitFor),
        catchError(() => of(false)),
      );

      return fromPromise(this.swUpdate.checkForUpdate()).pipe(
        switchMap(() => available$),
      );
    }

    return timer(waitFor).pipe(mapTo(false));
  }
}
