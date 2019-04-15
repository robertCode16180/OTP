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
    secret: string;
    token: string;
    otp: OTP;
    options: OptionsToken;
    epochSnapshot: number;
    periodoExp: number;
    cuentaNextTick: number;

    constructor(private generateOTP: GenerateOTPService) {
        this.titleApp = 'Serco Vip Acces';
        this.secret = 'TPQDAHVBZ5NBO5LFEQKC7V7UPATSSMFY';
        this.options = {
            algorithm: "sha256", 
            digits: 6,
            period: 15
        }
        this.epochSnapshot = 0;
    }

    ngOnInit(): void {
        this.otp = new OTP(this.secret, this.options);
        console.log('*** run ngOnInit ***');
        const token = this.otp.getToken(-1);
        this.token = this.normalizeToken(token);
        // console.log('anterior ', this.otp.getToken(-1));
        // console.log('actual ',this.otp.getToken(0));
        // console.log('prox ', this.otp.getToken(1));
        // console.log('********************');
        this.ticker();
        const generateOTP = this.generateOTP.credencial;
        console.log(generateOTP);
    }

    private ticker() {
        let epoch = Math.round(new Date().getTime() / 1000.0);
        this.periodoExp = this.options.period;
        this.cuentaNextTick = (this.periodoExp - (epoch % this.periodoExp));
        if (epoch % this.periodoExp == 0) {
            if(epoch > this.epochSnapshot + 5) {
                this.epochSnapshot = epoch;
                const token = this.otp.getToken();
                this.token = this.normalizeToken(token);
            }
        }
        setTimeout(() => {
            this.ticker();
        }, 1000);
    }

    private normalizeToken(token: string): string {
        if (token === this.otp.getToken(0)) {
            // console.log('token iguales de debe generar uno nuevo!!!!!!');
            token = this.otp.getToken();
        }
        const totalLength =  token.length;
        const firtsLength = Math.round(totalLength / 2);
        const firstPart = token.substring(0, firtsLength);
        const seconPart = token.substring(firtsLength, totalLength);
        return `${firstPart}  ${seconPart}`;
    }
}
