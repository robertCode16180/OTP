import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { CircularProgressBarComponent } from "../circular-progress-bar/circular-progress-bar.component";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativeScriptUIGaugeModule
    ],
    declarations: [
        HomeComponent,
        CircularProgressBarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
