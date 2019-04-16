import { device } from "tns-core-modules/platform";

export class DeviceInfoModels {

    manufacturer: string;
    model: string;
    os: string;
    osVersion: string;
    sdkVersion: string;
    deviceType: string;
    uuid: string;
    language: string;
    region: string;

    constructor() {
        this.manufacturer = device.manufacturer;
        this.model = device.model;
        this.os = device.os;
        this.osVersion = device.osVersion;
        this.sdkVersion = device.sdkVersion;
        this.deviceType = device.deviceType;
        this.uuid = device.uuid;
        this.language = device.language;
        this.region = device.region;
    }
}
