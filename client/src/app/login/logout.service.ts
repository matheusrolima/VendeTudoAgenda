import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { clearToken } from "./login.service";

@Injectable()
export class LogoutService {

    constructor(private router: Router,
                @Inject(DOCUMENT) private document: Document ){

    }

    logout(){
        
        clearToken();

        this.router.navigate(['/login'])

        this.document.body.classList.add('back-login');
    }
}