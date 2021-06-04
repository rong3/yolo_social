
import { NgModule } from '@angular/core';
import { MyCurrencyPipe } from '../../shared/currencyFormat'
import { MyCurrencyFormatterDirective } from '../../shared/directive/currencyFormatter'
@NgModule({
    declarations: [MyCurrencyFormatterDirective],
    exports: [MyCurrencyFormatterDirective],
    providers: [MyCurrencyPipe]
})
export class CurrencyFormatModule { }