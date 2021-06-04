import { NgModule } from '@angular/core';
import { BlockComponentComponent } from './block-component/block-component.component';
import { ShopManageComponent } from './shop-manage.component';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../shared/component/loading/loading.module';
import { ShopRoutingModule } from './shop-manage-routing.module';
 

@NgModule({
    imports: [
        VirtualScrollerModule,
        FormsModule,
        CommonModule,
        LoadingModule,
        ShopRoutingModule
    ],
    declarations: [
        ShopManageComponent,
        BlockComponentComponent
    ],
    providers:[]
})

export class ShopModule { }