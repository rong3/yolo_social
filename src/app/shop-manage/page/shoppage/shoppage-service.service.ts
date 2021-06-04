import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShopModel } from '../../shop-manage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppageService {

  constructor() { }

  shopList = new BehaviorSubject<ShopModel[]>([]);

  update(shop: ShopModel) {
    this.shopList.next([shop]);
  }

  getValue(index: any) {

    return this.shopList.getValue().splice(index, 1);
  }

  clear() {
    this.shopList.next(null);
  }

  initList(shopArray: ShopModel[]) {
    shopArray.forEach(item => {
      setTimeout(() => {
        this.shopList.next([item]);
      }, 100);
    })
  }
}
