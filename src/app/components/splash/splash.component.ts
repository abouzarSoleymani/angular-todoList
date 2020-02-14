import {ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {animate, animateChild, query, style, transition, trigger} from '@angular/animations';
import {PwaService} from '@app/core/services/pwa.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fadeOut', [
      transition(':leave', [
        query(':leave', animateChild(), {optional: true}),
        animate(300, style({opacity: 0}))
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashComponent implements OnInit {

  show = true;
  constructor( private pwaService: PwaService,
               private cdr: ChangeDetectorRef,
               private appRef: ApplicationRef) {
  }

  ngOnInit() {
    this.pwaService.checkForUpdate()
      .subscribe(result => {
        console.log(result)
        this.show = result;
        this.cdr.detectChanges();
      });
  }
}
