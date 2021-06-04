import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { Approutes } from './app-routing.module';
import { DeferLoadDirective } from './shared/directive/deferLoad';
import { ChatModule } from './chat/chat.module'
import { ShopModule } from './shop-manage/shop-manage.module';
import { ShopPageModule } from './shop-manage/page/shoppage.module';


@NgModule({
  declarations: [
    AppComponent,
    DeferLoadDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ShopModule,
    ChatModule,
    ShopPageModule,
    // RouterModule.forRoot(ShopRoutes, { useHash: false, preloadingStrategy: PreloadAllModules }),
    ToastrModule.forRoot({ timeOut: 2000, enableHtml: true }),
    RouterModule.forRoot(Approutes, { useHash: false, preloadingStrategy: PreloadAllModules }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
