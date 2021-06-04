import { Component, Input, OnInit } from '@angular/core';
import { MultiMediaBlockService } from './multi-media-block.module';

@Component({
  selector: 'app-multi-media-block',
  templateUrl: './multi-media-block.component.html',
  styleUrls: ['./multi-media-block.component.css']
})
export class MultiMediaBlockComponent implements OnInit {
  @Input() public model: any;

  page: number;
  pageSize: number;
  collectionSize: number;
  productsTemp: any;
  filterargs: any;
  updated: any;
  priceChange: any;
  productChange: any;

  constructor(private mediaService:MultiMediaBlockService) { }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 8;
  }

  highlightSelected(products) {
    //  this.productFrame=products;
  }

  filter(arg: any, prc: any) {
    this.filterargs = { name: arg, price: prc };
    // this.changeDetectorRef.detectChanges();
  }

  base64Convert(imgUrl) {
    // let result = 'data:image/png;base64, ';
    // let base64image = this.mediaService.getBase64Image(imgUrl).then(function (base64image) {
    //   //return Observable.of(result + base64image);
    //   return result + base64image;
    // }, function (reason) {
    //   console.log(reason); // Error!
    //   return '';
    // });
     let result = 'data:image/png;base64, ';
     return result + this.mediaService.getBase64Image(imgUrl);
  }
}
