import { Component, OnInit } from "@angular/core";
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
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    titleApp: string;
    token: string;
    otp: OTP;
    options: OptionsToken;
    epochSnapshot: number;
    periodoExp: number;
    cuentaNextTick: number;
    secret: string;

    constructor(private generateOTP: GenerateOTPService) {
        this.titleApp = 'Serco Vip Access';
        this.options = {
            algorithm: "sha256", 
            digits: 6,
            period: 30
        }
        this.epochSnapshot = 0;
        this.secret = this.generateOTP.getIDcredential;
    }

    ngOnInit(): void {
        this.otp = new OTP(this.secret, this.options);
        console.log('*** run ngOnInit ***');
        const token = this.otp.getToken(-1);
        this.token = this.normalizeToken(token);
        this.ticker();
    }

    private ticker() {
        let epoch = Math.round(new Date().getTime() / 1000.0);
        this.periodoExp = this.options.period;
        this.cuentaNextTick = (this.periodoExp - (epoch % this.periodoExp));
        if (epoch % this.periodoExp == 0) {
            if(epoch > this.epochSnapshot) {
                this.epochSnapshot = epoch;
                const token = this.otp.getToken();
                this.token = this.normalizeToken(token);
            }
        }
        setTimeout(() => {
            this.ticker();
        }, 100);
    }

    private normalizeToken(token: string): string {
        const totalLength =  token.length;
        const firtsLength = Math.round(totalLength / 2);
        const firstPart = token.substring(0, firtsLength);
        const seconPart = token.substring(firtsLength, totalLength);
        return `${firstPart}  ${seconPart}`;
    }

    get parcialID(): string {
        const length = this.secret.length;
        const parcial = this.secret.substring(length - 4, length); 
        return parcial;
    }
}
