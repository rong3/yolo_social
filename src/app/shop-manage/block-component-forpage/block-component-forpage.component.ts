import { Component, OnInit, Renderer2, ElementRef, ViewChild, Input } from '@angular/core';
import { ShoppageComponent } from '../page/shoppage/shoppage.component';
import { ShopModel, Post } from '../shop-manage.service';

@Component({
  selector: 'app-block-component-forpage',
  templateUrl: './block-component-forpage.component.html',
  styleUrls: ['./block-component-forpage.component.css']
})
export class BlockComponentForpageComponent implements OnInit {

  @Input() public model: any;


  @ViewChild('postBlock')
  postBlock: ElementRef

  @ViewChild('MenuofPost')
  MenuofPost: ElementRef

  shop: ShopModel;
  blockPost: Post;
  stateMenu: boolean = false;

  constructor(private renderer: Renderer2, public com: ShoppageComponent) {

  }

  ngOnInit() {
    this.shop = this.model[0];
    this.blockPost = this.model[1];
  }
  ngOnDestroy() {
    this.shop=null;
    this.blockPost=null;
   
  }

  hiding(item: Post) {
    item.state = 'hide';
    this.renderer.setStyle(this.postBlock.nativeElement, 'opacity', '0');
    setTimeout(() => {
      this.com.hiding(item.id, this.shop);
    }, 300);

    // setTimeout(() => {
    //   item.state = 'show';
    // }, 1000);
  }

  hideShop(shop: ShopModel) {
    shop.state = 'hide';
    this.renderer.setStyle(this.postBlock.nativeElement, 'opacity', '0');
    setTimeout(() => {
      this.com.hidingShop(shop);
    }, 300);

  }
  disposeElement() {
    // if (this.stateMenu === true)
    //   this.renderer.setAttribute(this.MenuofPost.nativeElement, 'class', 'dropdown-menu dropdown-menu-right');
  }

  ShowMenuPost() {
    if (this.stateMenu === false) {
      this.renderer.setAttribute(this.MenuofPost.nativeElement, 'class', 'dropdown-menu show  dropdown-menu-right');
      this.stateMenu = true;
      return;
    }
    else {
      this.renderer.setAttribute(this.MenuofPost.nativeElement, 'class', 'dropdown-menu dropdown-menu-right');
      this.stateMenu = false;
    }
  }

}
