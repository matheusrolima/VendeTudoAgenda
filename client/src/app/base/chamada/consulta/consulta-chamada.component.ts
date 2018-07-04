import { Component, OnInit } from '@angular/core';
import { Chamada } from '../../modelo/Chamada.model';

import { ActivatedRoute, Router } from "@angular/router";
import { ChamadaService } from '../chamada.service';

@Component({
  selector: 'app-detalhamento-chamada',
  templateUrl: './consulta-chamada.component.html',
  styles: []
})
export class ConsultaChamadaComponent implements OnInit {
  chamada:Chamada = new Chamada();
  public duracao: String;
  constructor(private chamadaService: ChamadaService,
              private activatedRoute:ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(parametro => {
      if (parametro["id"] !== undefined)
        console.log(parametro["id"]);
        this.chamadaService.get(parametro["id"]).subscribe(result=>{
            this.chamada = result;

            let duracaoSplit = String(this.chamada.duracao).split(":");

            this.duracao = duracaoSplit[0] + " hrs " + duracaoSplit[1] + " min " + duracaoSplit[2] + " seg";

        });
    });
  }

  voltarTelaPrincipal(): void{
    this.router.navigate(['/principal']);
  }

}
