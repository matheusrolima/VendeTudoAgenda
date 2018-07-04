import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contato } from '../../modelo/contato.model';
import { saveAs } from 'file-saver/FileSaver';
import { ContatoService } from '../contato.service';
import { Message } from 'primeng/api';
import { CategoriaService } from '../../categoria/categoria.service';
import { base64toBlob } from '../../../arquitetura/Util';

@Component({
    templateUrl: './contato-listagem.component.html'
})
export class ContatoListagemComponent implements OnInit {
    public contato: Contato[];
    public selectedContato: Contato;
    msgs: Message[] = [];

    constructor(
        protected contatoService: ContatoService,
        private categoriaService: CategoriaService,
        private router: Router,
        private activateRoute: ActivatedRoute) {
    }

    ngOnInit(): void {

        this.contatoService.listarContatos().subscribe((res) => {
            this.contato = JSON.parse(res._body);
        });

    }

    voltarTelaPrincipal(): void {
        this.router.navigate(['/principal']);
    }

    detalhes() {
        this.msgs = [];
        if (!this.selectedContato) {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Selecione um contato da lista' });
        }

        this.router.navigate(['cadastros/contato/edicao/' + this.selectedContato.id]);
    }

    gerarRelatorio() {
        this.contatoService.gerarRelatorio().subscribe(result => {
            if (result['_body']) {
                let blob = base64toBlob(result['_body']);
                saveAs(blob, 'contatos.xls');
            }

            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Service Message', detail: 'Dados exportados com sucesso!' });

        });
    }

}


