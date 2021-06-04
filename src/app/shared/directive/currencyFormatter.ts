import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { MyCurrencyPipe } from "../currencyFormat";

@Directive({ selector: "[myCurrencyFormatter]" })
export class MyCurrencyFormatterDirective implements OnInit {

    private el: HTMLInputElement;

    constructor(
        private elementRef: ElementRef,
        private currencyPipe: MyCurrencyPipe
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.el.value = this.currencyPipe.transform(this.el.value);
    }

    @HostListener("keyup", ["$event.target.value"])
    keyup(value) {
        this.el.value = this.currencyPipe.transform(value);
    }

}