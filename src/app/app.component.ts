import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import { ElementRef, ViewChild } from '@angular/core'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router

  ) {
    // router.events.subscribe(this._navigationInterceptor);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
     
      }

      if (event instanceof NavigationEnd) {
        if (document.getElementById('site') != null) {
          document.getElementById('site').remove();
        }
        const node = document.createElement('script');
        node.src = './assets/js/site.js';
        node.type = 'text/javascript';
        node.async = false;
        node.id = 'site';
        node.charset = 'utf-8';
        document.getElementsByTagName('body')[0].appendChild(node);

      
      }

      if (event instanceof NavigationCancel) {
        //  this._hideSpinner()
      }
      if (event instanceof NavigationError) {
        // this._hideSpinner()
      }
    });
  }
}