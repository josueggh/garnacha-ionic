import { Component, Input, HostBinding, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { AppShellConfig } from '../config/app-shell.config';

@Component({
  selector: 'app-image-shell',
  templateUrl: './image-shell.component.html',
  styleUrls: ['./image-shell.component.scss']
})
export class ImageShellComponent {
  // To debug shell styles, change configuration in the assets/app-shell.config.json file
  private debugMode = (AppShellConfig.settings && AppShellConfig.settings.debug) ? AppShellConfig.settings.debug : false;

  // tslint:disable-next-line:variable-name
  _src = '';
  // tslint:disable-next-line:variable-name
  _alt = '';
  // tslint:disable-next-line:variable-name
  _mode = '';

  @HostBinding('class.img-loaded') imageLoaded = false;

  @HostBinding('style.backgroundImage') backgroundImage: string;

  @HostBinding('attr.mode')
  @Input()
  set mode(val: string) {
    this._mode = (val !== undefined && val !== null) ? val : '';
  }
  get mode(): string {
    return this._mode;
  }

  @Input()
  set src(val: string) {
    if (!this.debugMode) {
      this._src = (val !== undefined && val !== null) ? val : '';
    }

    if (this._mode === 'cover') {
      // Unset the background-image
      this.backgroundImage = 'unset';
    }

    // Show loading indicator
    // When using SSR (Server Side Rendering), avoid the loading animation while the image resource is being loaded
    if (isPlatformServer(this.platformId)) {
      this.imageLoaded = true;
    } else {
      this.imageLoaded = false;
    }
  }

  @Input()
  set alt(val: string) {
    this._alt = (val !== undefined && val !== null) ? val : '';
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  _imageLoaded() {
    this.imageLoaded = true;

    // If it's a cover image then set the background-image property accordingly
    if (this._mode === 'cover') {
      this.backgroundImage = 'url(' + this._src + ')';
    }
  }
}
