import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../modelo/categoria.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Message, ConfirmationService } from 'primeng/api';
import { RespostaRequisicao } from '../../../arquitetura/servico/requisicao';


@Component({
    selector: 'app-cadastro-categoria',
    templateUrl: './cadastro-categoria.component.html',
    styleUrls: ['./cadastro-categoria.component.css']
})
export class CadastroCategoriaComponent implements OnInit {

    categoria: Categoria = new Categoria();
    msgs: Message[] = [];
    titulo: string;

    constructor(private router: Router,
        private categoriaService: CategoriaService,
        private activatedRoute: ActivatedRoute,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(parametro => {
            if (parametro['id'] == undefined) {
                this.titulo = 'CADASTRO DE CATEGORIA';
            }
            else {
                this.titulo = 'EDITAR CADASTRO DE CATEGORIA';

                this.categoriaService.get(Number(parametro['id'])).subscribe(res => {
                    this.categoria = res;
                });
            }
        });
    }

    salvar() {
        if (!this.categoria.nome) {
            this.msgs = [];
            this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'Por favor preencha o nome da categoria' });
        }
        else {
            if (this.categoria.id == undefined) {
                this.categoriaService.salvar(this.montarBody()).subscribe(
                    res => {
                        this.msgs = [];
                        this.msgs.push({ severity: 'success', summary: 'Service Message', detail: 'Dados salvos com sucesso!' });
                        this.categoria = new Categoria();
                    },
                    erro => {
                        this.msgs = [];
                        this.msgs.push({ severity: 'info', summary: 'Rejected', detail: 'A categoria informada já existe!' });
                    });

            } else {
                this.confirmationService.confirm({
                    message: 'Deseja realmente salvar alterações ?',
                    header: 'Confirmation',
                    icon: 'fa fa-trash',
                    accept: () => {

                        this.categoriaService.alterar(this.montarBody(), this.categoria.id).subscribe(res => {

                            this.msgs = [];
                            this.msgs.push({ severity: 'success', summary: 'Service Message', detail: 'Dados alterados com sucesso!' });
                        });

                    },
                    reject: () => {
                        this.msgs = [{ severity: 'info', detail: 'Alteração cancelada' }];
                    }
                });
            }
        }

    }


    voltarTelaPrincipal() {
        this.router.navigate(['/principal']);
    }

    montarBody() {
        return { 'categoria': { 'nome': this.categoria.nome } };
    }

}
