import { Component, OnInit, AfterViewInit } from "@angular/core";
import OTP from 'otp-client';
import { GenerateOTPService } from "../services/generate-otp.service";

/**
 * algorithm: [SHA1, SHA256, SHA512]
 * @interface OptionsToken
 */
interface OptionsToken {
    algorithm: string;
    digits: number;
    period: number;
}

@Component({
    moduleId: module.id,
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, AfterViewInit {
    
    titleApp: string;
    token: string;
    otp: OTP;
    options: OptionsToken;
    epochSnapshot: number;
    periodoExp: number;
    cuentaNextTick: number;
    secret: string;
    parcialID: string;

    constructor(private generateOTP: GenerateOTPService) {
        console.log('******* constructor *******');
        this.titleApp = 'Serco Vip Access';
        this.options = {
            algorithm: "sha256", 
            digits: 6,
            period: 30
        }
        this.epochSnapshot = 0;
        this.secret = this.generateOTP.UUID;
        this.otp = new OTP(this.secret, this.options);
        this.periodoExp = this.options.period;
        const token = this.otp.getToken(-1);
        this.token = this.normalizeToken(token);
        this.cuentaNextTick = this.periodoExp;
    }

    ngAfterViewInit(): void {
        console.log('ngAfterViewInit');
        this.ticker();
    }

    ngOnInit(): void {
        console.log('ngOnInit');
    }
    
    private ticker() {
        setInterval(() => {
            --this.cuentaNextTick;
            if (this.cuentaNextTick < 0) {
                const token = this.otp.getToken();
                this.token = this.normalizeToken(token);
                this.cuentaNextTick = this.periodoExp;
            }
        } , 1000);
    }

    private normalizeToken(token: string): string {
        console.log('normalizeToken: ', token);
        const totalLength =  token.length;
        const firtsLength = Math.round(totalLength / 2);
        const firstPart = token.substring(0, firtsLength);
        const seconPart = token.substring(firtsLength, totalLength);
        return `${firstPart}  ${seconPart}`;
    }
}
