import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
    name: 'productFilter',
    pure: false
})
export class FilterProductPipe implements PipeTransform {
    transform(items: any[], filter: any): any {

        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        if (this.notNullStr(filter.name) && this.notNullStr(filter.price)) {
            return items;
        }

        if (!this.notNullStr(filter.name) && this.notNullStr(filter.price)) {
            return items.filter
                (
                    item =>
                        item.name.trim().toUpperCase().indexOf(filter.name.trim().toUpperCase()) !== -1
                );
        }


        return items.filter
            (
                item =>
                    item.name.trim().toUpperCase().indexOf(filter.name.trim().toUpperCase()) !== -1
                    &&
                    this.convertNumber(this.patchDiscount(item.price.toUpperCase())) <= this.convertNumber(filter.price.toUpperCase())
            );
    }

    convertNumber(str: string) {
        if (this.notNullStr(str))
            return 0;

        return parseInt(str.replace(/\D/g, ''));
    }

    patchDiscount(str: string) {
        if (str.indexOf('line-through'.toUpperCase()) !== -1) {
            return str.replace(/<[^>]*>?/gm, '').split(' ')[0];
        }

        return str;
    }

    notNullStr(str: string) {
        return str === undefined || str === '' || str === null;
    }
}