import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { Observable, of, Subject, merge } from 'rxjs'
import { scan, filter, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ShopManageService, ShopModel, Post } from './shop-manage.service';
import { VirtualScrollerComponent, IPageInfo } from 'ngx-virtual-scroller';
import { shiftInitState } from '@angular/core/src/view';

@Component({
  selector: 'app-shop-manage',
  templateUrl: './shop-manage.component.html',
  styleUrls: ['./shop-manage.component.css']
})
export class ShopManageComponent implements OnInit {
  @ViewChild('spinnerElement')
  spinnerElement: ElementRef

  @ViewChild('uploadView')
  uploadView: ElementRef

  @ViewChild(VirtualScrollerComponent)
  private virtualScroller: VirtualScrollerComponent;

  urls = [];
  showMyElement: boolean;
  shopList: Observable<ShopModel[]>;
  shopArray: any;
  sizeData: number;
  sizeItemRender: number = 10;
  bufferAmount: number = 5;
  insertPost: Post;


  constructor(private shopService: ShopManageService, private route: ActivatedRoute, private router: Router,
    private renderer: Renderer2) { }

  ngOnInit() {

    this.loading(true);
    this.insertPost = new Post;
    this.shopArray = new Array<ShopModel>();
    this.sizeData = 0;
    this.shopList = this.shopService.shopList.asObservable()
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

  tempData(id: any, name: string) {
    let dataFeed = new Array<Post>();
    for (let i = 0; i < 10; i++) {

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

  getData(api: string) {
    // let jsonResult: string;

    this.tempData(1, 'shop trieu');
    this.tempData(2, 'shop haha');
    this.tempData(3, 'CQQ');
    this.tempData(4, 'Lee =))');
    this.shopArray = this.mergedData(this.shopArray);

    //TODO: shuffle this array
    setTimeout(() => {
      let filter = this.shuffle(this.shopArray.sort((a, b) => b.id - a.id)).filter((shop, idx) => shop.state === 'show' && idx < this.sizeItemRender);
      this.shopService.initList(filter);
      this.sizeData = filter.length;
    }, 1);
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

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


  fetchMore(event: IPageInfo) {
    // console.log(event.endIndex);
    // console.log(this.sizeData - 1);
    if (event.endIndex >= this.sizeData - 1 && event.endIndex >= this.sizeItemRender - 1) {
      this.loading(true);
      this.sizeItemRender = 10;
      let filter = this.shopArray.filter((shop, idx) => shop.state === 'show' && idx > this.sizeData - 1 && idx < this.sizeData + this.sizeItemRender);
      if (filter.length > 0) {
        this.sizeData += filter.length;
        this.shopService.initList(filter);
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

  hiding(id: string, material: ShopModel) {

    let filter = this.shopArray.filter((shop) => shop.id === material.id &&
      shop.dataFeed[0].id === id
    );

    this.shopService.initList(filter);
  }

  hidingShop(material: ShopModel) {

    this.shopArray.filter((shop) => shop.id === material.id)
      .forEach((ele) => {
        ele.state = 'hide';
      })
    this.shopService.update(material);
  }


  loading(x: boolean) {
    if (x) {
      this.renderer.setStyle(this.spinnerElement.nativeElement, 'opacity', '1');
      return;
    }
    this.renderer.setStyle(this.spinnerElement.nativeElement, 'opacity', '0');
  }

  scrolltoTop() {
    this.virtualScroller.scrollToIndex(-1);
  }

  insertnewPost(data: Post) {
    this.renderer.setStyle(this.uploadView.nativeElement, 'display', 'none');
    let dataFeed = new Array<Post>();

    let data1 = new Post();
    data1.id = 100;
    data1.typePost = 'image';
    data1.idshop = 1;
    this.urls.forEach((ele) => {
      data1.images.push(ele)
    });

    data1.content = data.content;
    dataFeed.push(data1);
    let news = new ShopModel(1, 'shop trieu', 'https://i.pinimg.com/564x/78/99/f5/7899f5988c45d166ba234529ede38754.jpg', dataFeed, 'show');

    setTimeout(() => {
      this.shopService.clear();
      this.urls = [];
      this.ngOnInit();
      this.shopArray.unshift(news);
      this.shopService.update(news);
    }, 300);

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.renderer.setStyle(this.uploadView.nativeElement, 'display', 'block');
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
      console.log(this.urls);

    }
  }

}
