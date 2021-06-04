import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component'
import { ShopManageComponent } from './shop-manage/shop-manage.component';
import {ShoppageComponent} from './shop-manage/page/shoppage/shoppage.component'
import { ShopPageModule } from './shop-manage/page/shoppage.module';

export const Approutes: Routes = [

    {
        path: '',
        component: ShopManageComponent
        // ,
        // children: [
        //     {
        //         path: 'page',
        //         loadChildren: './shop-manage/page/shoppage.module#ShopPageModule',
        //         data: { preload: true }
        //     }
        // ]
    },
    {
        path: 'chatservice',
        component: ChatComponent
    },
    
    {
        path: 'page',
        component: ShoppageComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
