import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-default-layout',
  styleUrls: ['./default-layout.component.scss'],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Array<Subscription> = new Array();

  public sidenavMode: MatDrawerMode = 'side';
  public sidenavOpened: boolean = false;

  constructor(
      private readonly breakpointObserver: BreakpointObserver) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(tap(({ matches }) => {
          if(matches) {
            this.sidenavMode = 'over';
            this.sidenavOpened = false;
          } else {
            this.sidenavMode = 'side';
            this.sidenavOpened = true;
          }
        }))
        .subscribe(),
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
