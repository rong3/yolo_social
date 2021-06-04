import { Injectable, Output, EventEmitter } from '@angular/core';
import { ChatComponent } from '../../chat.component';
import { ChatService } from '../../service/chat.service';

@Injectable({
  providedIn: 'root'
})
export class MessageButtonService  {

  constructor(private chat: ChatService) {
   
  }

  sendMessage(input:string){
    this.chat.converse(input);
  }
}
