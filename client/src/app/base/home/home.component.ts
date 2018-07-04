import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/platform-browser';
import {LogoutService} from '../../login/logout.service';
import {Message, SelectItem} from 'primeng/api';
import {ContatoService} from '../contato/contato.service';
import {saveAs} from 'file-saver/FileSaver';
import {base64toBlob} from '../../arquitetura/Util';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    display: boolean = false;
    tipo: SelectItem[];
    valorPesquisa: any;
    contatoId: any;
    option: string = 'Selecione';
    msgs: Message[] = [];

    constructor(private router: Router,
                @Inject(DOCUMENT) private document: Document,
                private logoutService: LogoutService,
                private contatoService: ContatoService) {

        this.document.body.classList.add('back-login');
        this.tipo = [
            {label: 'Selecione', value: 'Selecione'},
            {label: 'CPF', value: 'CPF'},
            {label: 'CNPJ', value: 'CNPJ'},
            {label: 'NOME', value: 'NOME'}
        ];
    }

    ngOnInit() {
    }

    showDialog() {
        this.display = true;
    }

    sair() {
        this.logoutService.logout();
    }

    alterarBack() {
        this.document.body.classList.remove('back-login');
    }

    buscar() {

        if (!this.valorPesquisa) {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: 'Warn Message', detail: 'Preencha o campo para pesquisa'});

            this.document.getElementById('valor').focus();

        } else if (this.option === 'Selecione') {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: 'Warn Message', detail: 'Selecione uma opção'});

        }

        if (this.option === 'CPF') {

            this.contatoService.listarCpf(this.valorPesquisa).subscribe(res => {
                this.contatoId = res.id;

                this.router.navigate(['cadastros/contato/edicao/' + this.contatoId]);

                this.document.body.classList.remove('back-login');

            }, (erro) => {

                this.msgs = [];
                this.msgs.push({
                    severity: 'error',
                    summary: 'Warn Message',
                    detail: 'Nenhum contato com a caracteristica descrita foi encontrado em nossa base de dados!'
                });

            });
        }
        if (this.option === 'CNPJ') {

            this.contatoService.listarCnpj(this.valorPesquisa).subscribe((res) => {
                this.contatoId = res.id;

                this.router.navigate(['cadastros/contato/edicao/' + this.contatoId]);

                this.document.body.classList.remove('back-login');
            }, (erro) => {

                this.msgs = [];
                this.msgs.push({
                    severity: 'error',
                    summary: 'Warn Message',
                    detail: 'Nenhum contato com a caracteristica descrita foi encontrado em nossa base de dados!'
                });

            });
        }

        if (this.option === 'NOME') {

            this.contatoService.listarNome(this.valorPesquisa).subscribe((res) => {
                this.contatoId = res.id;
                this.router.navigate(['cadastros/contato/edicao/' + this.contatoId]);
                this.document.body.classList.remove('back-login');

            }, (erro) => {

                this.msgs = [];
                this.msgs.push({
                    severity: 'error',
                    summary: 'Warn Message',
                    detail: 'Nenhum contato com a caracteristica descrita foi encontrado em nossa base de dados!'
                });
            });
        }

    }

    gerarRelatorio(event) {
        event.preventDefault();

        this.contatoService.gerarRelatorio().subscribe(result => {
            if (result['_body']) {
                saveAs(base64toBlob(result['_body']), 'contatos.xls');
            }
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Service Message', detail: 'Dados exportados com sucesso!'});

        });
    }

}