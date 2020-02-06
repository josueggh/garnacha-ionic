import { Component, Input, HostBinding } from '@angular/core';

import { AppShellConfig } from '../config/app-shell.config';

@Component({
  selector: 'app-text-shell',
  templateUrl: './text-shell.component.html',
  styleUrls: ['./text-shell.component.scss']
})
export class TextShellComponent {
  // To debug shell styles, change configuration in the assets/app-shell.config.json file
  private debugMode = (AppShellConfig.settings && AppShellConfig.settings.debug) ? AppShellConfig.settings.debug : false;

  // tslint:disable-next-line:variable-name
  _data: '';

  @HostBinding('class.text-loaded') textLoaded = false;

  @Input() set data(val: any) {
    if (!this.debugMode) {
      this._data = (val !== undefined && val !== null) ? val : '';
    }

    if (this._data && this._data !== '') {
      this.textLoaded = true;
    } else {
      this.textLoaded = false;
    }
  }

  constructor() { }
}
