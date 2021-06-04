import { Injectable } from '@angular/core';
import { ChatService } from '../../service/chat.service';

@Injectable({
    providedIn: 'root'
})
export class MultiMediaBlockService {

    constructor() {

    }

    getBase64Image(imgUrl) {
        // return new Promise(
        //   function (resolve, reject) {

        //     var img = new Image();
        //     var timestamp = new Date().getTime();
        //     img.setAttribute('crossOrigin', 'anonymous');
        //     img.src = imgUrl + '?' + timestamp;

        //     img.onload = function () {
        //       var canvas = document.createElement("canvas");
        //       canvas.width = img.width;
        //       canvas.height = img.height;
        //       var ctx = canvas.getContext("2d");
        //       ctx.drawImage(img, 0, 0);
        //       var dataURL = canvas.toDataURL("image/png");
        //       resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
        //     }
        //     img.onerror = function () {
        //       reject("The image could not be loaded.");
        //     }
        //   });

        var img = new Image();
        var timestamp = new Date().getTime();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = imgUrl + '?' + timestamp;

        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        };
       // return null;
    }
}