import { NgModule } from '@angular/core';

import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingModule } from 'src/app/shared/component/loading/loading.module';
import { ShoppageComponent } from './shoppage/shoppage.component';
import { BlockComponentForpageComponent } from '../block-component-forpage/block-component-forpage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 import { ShopPageRoutingModule } from './shoppage/shoppage-routing.module';

@NgModule({
    imports: [
        VirtualScrollerModule,
        FormsModule,
        CommonModule,
        LoadingModule,
        NgbModule,
        ShopPageRoutingModule
    ],
    declarations: [
        ShoppageComponent,
        BlockComponentForpageComponent
    ],
    providers:[]
})

export class ShopPageModule { }