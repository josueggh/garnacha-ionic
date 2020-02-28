import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  resize(path: string, size: number = 400) {
    let quality = 60;
    const extensionArray = path.split('.');
    const extension = extensionArray[extensionArray.length - 1];

    if (extension.toLowerCase() === 'png') {
        quality = 20;
    }

    if(size<=200){
      quality = 30;
    }

    return `https://images.weserv.nl/?url=${path}&w=${size}&h=${size}&q=${quality}&fit=cover&a=attention`;
  }
}
