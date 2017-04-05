import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title }  from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: `/app/views/header.html`
})
export class AppComponent { 
  public constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

 ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));
  }
}