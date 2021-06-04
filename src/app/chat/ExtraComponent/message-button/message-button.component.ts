import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MessageButtonService } from './message-button.service';

@Component({
  selector: 'app-message-button',
  templateUrl: './message-button.component.html',
  styleUrls: ['./message-button.component.css']
})
export class MessageButtonComponent implements OnInit {

  payloadButtonModel: any = {
    text: "",
    class: ""
  }
  @Input() public model: any;
  @ViewChild('btnTracking') trackingBtn: ElementRef;


  constructor(private btnService: MessageButtonService) {
  }

  ngOnInit() {
    this.payloadButtonModel.text = this.model.textValue;
    this.payloadButtonModel.class = this.model.classValue;
  }

  Execute() {
    this.btnService.sendMessage(this.payloadButtonModel.text);
    this.trackingBtn.nativeElement.disabled = true;
    setTimeout(() => {
      this.trackingBtn.nativeElement.disabled = false;
    }, 1000);
  }

}
