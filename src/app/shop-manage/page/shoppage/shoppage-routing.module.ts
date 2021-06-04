import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppageComponent } from './shoppage.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
          
      { path: 'page/:id', component: ShoppageComponent },
      
  ])
  ],
  exports: [
    RouterModule
  ]
})
export class ShopPageRoutingModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/