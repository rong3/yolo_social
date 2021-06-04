import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, filter, scan } from 'rxjs/operators';

import { VirtualScrollerComponent, IPageInfo } from 'ngx-virtual-scroller';
import { Observable } from 'rxjs';
import { ShopModel, ShopManageService, Post } from '../../shop-manage.service';
import { ShoppageService } from './shoppage-service.service';

@Component({
  selector: 'app-shoppage',
  templateUrl: './shoppage.component.html',
  styleUrls: ['./shoppage.component.css']
})
export class ShoppageComponent implements OnInit {
  @ViewChild('spinnerElement')
  spinnerElement: ElementRef

  @ViewChild(VirtualScrollerComponent)
  private virtualScroller: VirtualScrollerComponent;

  id: any;
  urls = [];
  showMyElement: boolean;
  shopList: Observable<ShopModel[]>;
  shopArray: any;
  sizeData: number;
  sizeItemRender: number = 10;
  bufferAmount: number = 5;
  insertPost: Post;
  shopBase: ShopModel;
  page: number;

  constructor(private service: ShopManageService, private renderer: Renderer2, private route: ActivatedRoute, private router: Router, ) { }

  ngOnInit() {
    this.loading(true);
    this.page = 1;
    this.shopArray = new Array<ShopModel>();
    this.id = this.route.snapshot.paramMap.get('id');

    this.checkAuthorize(this.id);
    this.service.shopList.next(null);
    this.shopList = this.service.shopList.asObservable()
      .pipe(
        filter(msg => msg !== null),
        scan((acc, val) => {
          return this.middleWare(acc, val);
        })
      );

    this.getData('');

    setTimeout(() => {
      this.loading(false);
    }, 500);
  }

  initBase(id) {
    this.shopBase = new ShopModel(id, 'Shop Trieu', 'https://i.pinimg.com/564x/78/99/f5/7899f5988c45d166ba234529ede38754.jpg', [], 'show');
  }

  middleWare(acc: ShopModel[], val: ShopModel[]) {
    //if (val[0].dataFeed[0].state === 'hide') {
    //TODO made it more excatly with unique id post and id shop
    if (val[0].state === 'hide') {
      let temp = acc.filter((a) => a.id !== val[0].id);
      this.sizeData -= temp.length;
      this.sizeItemRender -= temp.length;
      return temp;
    }
    if (val[0].dataFeed.map((item) => item.state === 'hide').indexOf(true) !== -1) {
      var index = acc.findIndex(
        (shop) => shop.id === val[0].id
          && shop.dataFeed[0].state === 'hide'
      );
      if (index !== -1) {
        acc.splice(index, 1);
        console.log('detect remove:' + (this.sizeData - 1));
        this.sizeData -= 1;
      }
      return acc;
    }
    if (val[0].state === 'show') {
      this.sizeData = acc.length + 1;
      return acc.concat(val);
    }
  }

  getData(api: string) {
    // let jsonResult: string;

    this.tempData(this.id, 'shop trieu');

    this.shopArray = this.mergedData(this.shopArray);

    //TODO: shuffle this array
    setTimeout(() => {
      let filter = this.shuffle(this.shopArray.sort((a, b) => b.id - a.id)).filter((shop, idx) => shop.state === 'show' && idx < this.sizeItemRender);
      this.service.initList(filter);
      this.sizeData = filter.length;
    }, 1);
  }

// this is need to use because converting data from object to Model
  mergedData(data: any) {
    let shopArraySplit = new Array<ShopModel>();

    data.forEach(element => {
      element.dataFeed.forEach(feed => {
        let temp = Object.assign({}, element)
        temp.dataFeed = [];
        temp.dataFeed.push(feed);
        shopArraySplit.push(temp);
      });
    });

    return shopArraySplit;
  }

  hiding(id: string, material: ShopModel) {

    let filter = this.shopArray.filter((shop) => shop.id === material.id &&
      shop.dataFeed[0].id === id
    );

    this.service.initList(filter);
  }

  hidingShop(material: ShopModel) {

    this.shopArray.filter((shop) => shop.id === material.id)
      .forEach((ele) => {
        ele.state = 'hide';
      })
    this.service.update(material);
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  checkAuthorize(id) {
    if (id == null || id.trim() == '') {
      this.router.navigate(['/']);
    }
    else
      this.initBase(id);
  }

  tempData(id: any, name: string) {
    let dataFeed = new Array<Post>();
    for (let i = 0; i < 20; i++) {

      let data1 = new Post();
      data1.id = (i + 1);
      data1.typePost = 'image';
      data1.idshop = id;
      data1.images = [
        "https://i.pinimg.com/736x/f6/15/39/f615398b53054296870a927b4785ff42.jpg",
        "https://img.thuthuattinhoc.vn/uploads/2019/01/25/hinh-anh-anime-chibi-de-thuong_120352569.jpg",
        "https://hinhanhdephd.com/wp-content/uploads/2019/01/hinh-nen-dien-thoai-de-thuong-400x600.jpg",
        "https://img.thuthuattinhoc.vn/uploads/2019/01/25/anh-anime-chibi-boy_120351335.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTR4ZdztFk4ODqx13kSh4pnwp4gk3mUdO-f5YOKN_NI2_ehyDk",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTR4ZdztFk4ODqx13kSh4pnwp4gk3mUdO-f5YOKN_NI2_ehyDk",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTR4ZdztFk4ODqx13kSh4pnwp4gk3mUdO-f5YOKN_NI2_ehyDk"
      ];
      data1.content = 'test' + (i + 1);
      data1.state = 'show';

      let data11 = new Post();
      data11.id = (i + 1);
      data11.typePost = 'video';
      data11.idshop = id;
      data11.images = [
        "https://salt.tikicdn.com/cache/w584/ts/banner/92/bf/22/a006caf864c1caf50424afd3f8f8d3ef.png"

      ];
      data11.videoLink = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
      data11.content = 'test' + (i + 1);
      data11.state = 'show';

      dataFeed.push(i % 2 == 0 ? data11 : data1);

    }
    this.shopArray.push(new ShopModel(id, name, 'https://i.pinimg.com/564x/78/99/f5/7899f5988c45d166ba234529ede38754.jpg', dataFeed, 'show'));
  }

  loading(x: boolean) {
    if (x) {
      this.renderer.setStyle(this.spinnerElement.nativeElement, 'opacity', '1');
      return;
    }
    this.renderer.setStyle(this.spinnerElement.nativeElement, 'opacity', '0');
  }

  fetchMore(event: IPageInfo) {
    // console.log(event.endIndex);
    // console.log(this.sizeData - 1);
    if (event.endIndex >= this.sizeData - 1 && event.endIndex >= this.sizeItemRender - 1) {
      this.loading(true);
      this.sizeItemRender = 10;
      let filter = this.shopArray.filter((shop, idx) => shop.state === 'show' && idx > this.sizeData - 1 && idx < this.sizeData + this.sizeItemRender);
      if (filter.length > 0) {
        this.sizeData += filter.length;
        this.service.initList(filter);
        this.virtualScroller.refresh();
      }
      setTimeout(() => {
        this.loading(false);
      }, 100);
    }

    if (this.sizeData === this.shopArray.length) {
      this.loading(false);
    }
  }


}
