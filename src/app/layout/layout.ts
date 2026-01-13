import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {
  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  scrollTo(id: string) {
  const doScroll = () => this.viewportScroller.scrollToAnchor(id);

  if (this.router.url !== '/') {
    this.router.navigate(['/'], { fragment: id }).then(() => {
      const sub = this.router.events
        .pipe(filter(e => e instanceof NavigationEnd), take(1))
        .subscribe(() => {
          doScroll();
          sub.unsubscribe();
        });
    });
  } else {
    this.router.navigate([], { fragment: id, queryParamsHandling: 'preserve' }).then(() => {
      doScroll();
    });
  }
}
}
