import { Injectable } from '@angular/core';

// import * as otplib from 'otplib';

@Injectable({
  providedIn: 'root'
})
export class GenerateOTPService {
  private secret = 'TPQDAHVBZ5NBO5LFEQKC7V7UPATSSMFY';
  
  constructor() { 

  }

  get credencial(): string {
    return this.secret;
  }


}
