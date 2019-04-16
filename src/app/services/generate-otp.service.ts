import { Injectable } from '@angular/core';
import { getString, setString, hasKey, remove, clear } from "tns-core-modules/application-settings";
import { PlatformModuleService } from './platform-module.service';
import { base32tohex } from '../funciones/base32';

@Injectable({
  providedIn: 'root'
})
export class GenerateOTPService {

  constructor(private platformService: PlatformModuleService) { 
  }

  get getIDcredential(): string {
    return this.generateBase32();
  }

  generateBase32(): string {
    const buffer = this.platformService.deviceInformation.uuid;
    return base32tohex(buffer).toUpperCase();
  }

}
