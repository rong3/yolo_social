import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShopManageService {

  shopList = new BehaviorSubject<ShopModel[]>([]);

  constructor() { }

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

export class ShopModel {
  constructor(public id: any, public name: string,public avatar: string, public dataFeed: Post[]
  ,public state:string) {

  }
}

export class Post {
  public id: any;
  public idshop: any;
  public typePost: string;
  public content: string;
  public images: any=[];
  public videoLink: string;
  public state: string;
}

export class Category{
  public id:any;
  public idshop:any;
  public categoryName:string;
}

export class Product{
  public id:any;
  public idshop:any;
  public categoryid:any;
  public productname:string;
  public productPrice:any;
  public avatarProduct:string;
}
export class ProductDetail{
  public idproduct:any;
  public productImage: any =[];
  public detailSpec:any;
  public detailDescription:any;
}