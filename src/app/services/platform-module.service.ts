import { Injectable } from '@angular/core';

import { DeviceInfoModels } from './device-info-models';
import { ScreenInfo } from './screen-info-models';


@Injectable({
  providedIn: 'root'
})
export class PlatformModuleService {
    constructor() {
        this.deviceInformation = new DeviceInfoModels();
        this.screenInformation = new ScreenInfo();
    }

    public screenInformation: ScreenInfo;
    public deviceInformation: DeviceInfoModels;

    public isItemVisible: boolean = false;
    public isItemVisibleScreenInfo: boolean = false;
    public deviceInfoButton: string = "Show device info";
    public screenInfoButton: string = "Show/Hide screen info";

    public deviceInfo(args?) {
        if (this.isItemVisible) {
            this.isItemVisible = false;
            this.deviceInfoButton = "Show device info";
        } else {
            this.isItemVisible = true;
            this.deviceInfoButton = "Hide device info";
        }
    }

    public screenInfo(args?) {
        if (this.isItemVisibleScreenInfo) {
            this.isItemVisibleScreenInfo = false;
            this.screenInfoButton = "Show screen info";
        } else {
            this.isItemVisibleScreenInfo = true;
            this.screenInfoButton = "Hide screen info";
        }
    }

}
