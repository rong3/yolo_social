import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ChatComponent} from './chat.component'
import{MessageButtonComponent} from './ExtraComponent/message-button/message-button.component'
import{MultiMediaBlockComponent} from './ExtraComponent/multi-media-block/multi-media-block.component'
import { CurrencyFormatModule } from '../shared/directive/CurrencyFormat.module';
import { SafeHtmlPipe } from '../shared/safeHTML';
import { SafePipe } from '../shared/safePipe';
import { FilterProductPipe } from '../shared/filterProducts';
import { MyCurrencyPipe } from '../shared/currencyFormat';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from '../shared/component/loading/loading.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NgbModule,
        CurrencyFormatModule,
        LoadingModule
    ],
    declarations: [
        ChatComponent,
        MessageButtonComponent,
        MultiMediaBlockComponent,
        SafePipe,
        SafeHtmlPipe,
        FilterProductPipe,
        MyCurrencyPipe,
    ],
    providers:[]
})

export class ChatModule { }