import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "myCurrency" })
export class MyCurrencyPipe implements PipeTransform {
  constructor() {

  }
  transform(value: number | string, fractionSize: number = 2): string {
    return value.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

}