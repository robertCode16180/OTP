import { Injectable } from '@angular/core';
import { getString, setString, hasKey, remove, clear } from "tns-core-modules/application-settings";
import { PlatformModuleService } from './platform-module.service';
// import { base32tohex } from '../funciones/base32';
import { _encryptData } from '../funciones/crypto';

@Injectable({
  providedIn: 'root'
})
export class GenerateOTPService {
  encryptUUID: string;
  base32: string;
  parcialID: string;

  constructor(private platformService: PlatformModuleService) {
    this.encryptUUID = _encryptData(this.UUID);
  }

  private generateParcialID(): string {
    const length = this.base32.length;
    const parcial = this.base32.substring(length - 6, length); 
    return parcial;
  }

  get UUID(): string {
    return this.platformService.deviceInformation.uuid;
  }


}
