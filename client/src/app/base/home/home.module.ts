import { NgModule } from "@angular/core";
import {ButtonModule} from 'primeng/button';
import {HomeComponent} from './home.component';
import { RouterModule } from "@angular/router";
import {DialogModule} from 'primeng/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {GrowlModule} from 'primeng/growl';

@NgModule({
    imports:[
        BrowserModule, 
        FormsModule,
        ButtonModule,
        RouterModule,
        DialogModule,
        DropdownModule,
        GrowlModule
        
    ],
    declarations:[
        HomeComponent
    ],
    providers:
    [

    ]
})
export class HomeModule{}