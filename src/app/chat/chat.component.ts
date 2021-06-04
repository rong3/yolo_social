import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { ChatService, Message } from './service/chat.service';
import { Observable } from 'rxjs'
import { scan, filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingModule } from '../shared/component/loading/loading.module';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  @ViewChild('inputFocus') contentInput: ElementRef;
  @ViewChild('spinnerElement')
  spinnerElement: ElementRef

  messages: Observable<Message[]>;
  formValue: string;
  productFrame: any;
  stepRandom: number = 0;
  randomValue: number;
  productsTemp: any;
  filterargs: any;
  updated: any;
  container: HTMLElement;
  
  constructor(private chat: ChatService, private toastr: ToastrService,private route: ActivatedRoute,private router: Router, private renderer: Renderer2,) { }

  ngOnInit() {
    this.loading(true);
   
    setTimeout(() => {
      this.messages = this.chat.conversation.asObservable()
      .pipe(
        filter(msg => msg !== null),
        scan((acc, val) => acc.concat(val))
      );

    this.chat.converse('cls');
    this.chat.clear();
    this.loading(false);
    }, 50);
   
  }

  ngAfterViewInit(){
    
  }


  sendMessage() {
    let elementEmoji = this.contentInput.nativeElement.emojioneArea;
    let msg = elementEmoji.getText();

    elementEmoji.hidePicker();

    if (msg.toLowerCase().trim() === '') {
      this.toastr.error("Nội dung tin nhắn trống", "Lỗi soạn thảo");
      elementEmoji.setText('');
      elementEmoji.setFocus();
      return;
    }

    if (msg.toLowerCase().trim() === 'cls') {
      elementEmoji.setFocus();
      elementEmoji.setText('');
      this.clearHistory();
      return;
    }

    // if (msg.toLowerCase().trim() === 'ghep doi') {
    //   this.chat.customUpdate('ghep doi',false);
    //   this.chat.customUpdate('Đang tìm...',true);
    //   elementEmoji.setFocus();
    //   elementEmoji.setText('');
    //   return;
    // }

    this.chat.converse(msg);
    elementEmoji.setFocus();
    elementEmoji.setText('');
  }

  sendMessageCustom(value: string) {
    this.formValue = '';
    this.chat.converse(value);
    this.contentInput.nativeElement.focus();
  }

  focusInput() {
    var messageBody = document.querySelector('#scrollcustom');
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }

  clearHistory() {
    this.chat.clear()
    this.toastr.success("Đã xóa lịch sử", "");
    this.ngOnInit();
    this.contentInput.nativeElement.focus();
  }

  getRandomArbitrary(min, max, total) {
    this.stepRandom++;
    if (this.stepRandom == 1) {
      min = Math.ceil(min);
      max = Math.floor(max);
      var result = Math.floor(Math.random() * (max - min + 1)) + min;
      this.randomValue = result;
      return result;
    }
    if (this.stepRandom > 1 && this.stepRandom <= total) {

      return this.randomValue;
    }
    else {
      this.stepRandom = 0;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  navigates(){
    this.router.navigateByUrl('/home');
  }

  loading(x: boolean) {
    if (x) {
      this.renderer.setStyle(this.spinnerElement.nativeElement, 'opacity', '1');
      return;
    }
    this.renderer.setStyle(this.spinnerElement.nativeElement, 'opacity', '0');
  }
}
