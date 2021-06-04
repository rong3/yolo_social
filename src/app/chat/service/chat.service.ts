import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  readonly token = environment.dialogflow.YoloBot;
  readonly client = new ApiAiClient({ accessToken: this.token });
  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {

  }

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  clear() {
    this.conversation.next(null);
  }

  customUpdate(msg:string,isBot:boolean){
    let who=isBot===true?'bot':'user';
    const userMsg = new Message(msg, who, []);
    this.update(userMsg);
  }


  converse(msg: string) {
    let messageBody = document.querySelector('#scrollcustom');

    if (msg.length > 0) {
      const userMsg = new Message(msg, 'user', []);
      this.update(userMsg);

      return this.client.textRequest(msg).then(res => {
       // console.log(res);
        const speech = res.result.fulfillment.speech;
        const payLoad = res.result.fulfillment.messages;
        const botMsg = new Message(speech, 'bot', payLoad);
        this.update(botMsg);
      })
        .then(function () {
          setTimeout(() => {
            //  messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
            // console.log(messageBody.scrollHeight - messageBody.clientHeight);
            //top:messageBody.scrollTop + 400
          //  messageBody.scrollTo({ left: 0, top: messageBody.scrollHeight - messageBody.clientHeight, behavior: 'smooth' });
          messageBody.scrollTop=messageBody.scrollHeight - messageBody.clientHeight;
        }, 1);
        });
    }
  }

  testEnviroment() {
    this.client.textRequest('hello').then(res => console.log(res));
  }
}

export class Message {
  constructor(public content: string, public sentBy: string, public payLoad: []) {

  }
}
