import { Component } from '@angular/core';
import { getUsuarioLogado } from './arquitetura/servico/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  mostrarNav: boolean = true;
  title = 'app';

  constructor(private router: Router){
    if(!getUsuarioLogado()){
      this.router.navigate[('login')]
    }
    if(getUsuarioLogado()){
      
      this.router.navigate(['/principal']);
    }
  }
  ngOnInit(){
    
    
  }
}
