import { screen } from "tns-core-modules/platform";

export class ScreenInfo {
    
    widthPixels: number;
    heightPixels: number;
    widthDIPs: number;
    heightDIPs: number;
    scale: number;

    constructor() {
        this.widthPixels  =  screen.mainScreen.widthPixels;
        this.heightPixels =  screen.mainScreen.heightPixels;
        this.scale        =  screen.mainScreen.scale;
        this.heightDIPs   =  screen.mainScreen.heightDIPs;
        this.widthDIPs    =  screen.mainScreen.widthDIPs;
    }
}
