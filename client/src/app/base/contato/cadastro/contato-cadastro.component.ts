import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contato } from '../../modelo/contato.model';
import { ConfirmationService, Message, SelectItem } from 'primeng/api';
import { Categoria } from '../../modelo/categoria.model';
import { CategoriaService } from '../../categoria/categoria.service';
import { ContatoService } from '../contato.service';
import { getFuncaoUsuarioLogado, getIdUsuarioLogado } from '../../../arquitetura/servico/base.service';
import { validarCNPJ, validarCPF } from '../../../arquitetura/Util';

@Component({
    templateUrl: './contato-cadastro.component.html'

})
export class ContatoCadastroComponent implements OnInit {
    public pessoa: SelectItem[];
    option: string = 'Selecione';
    titulo: string;
    data: string;
    configCalendario: any;
    optAutorizaEmail: string;
    public categorias: Categoria[];
    public idCategoria: any;
    msgs: Message[] = [];
    usuarioFuncao: string;
    usuarioAutorizado: string;
    public contato: Contato = new Contato();
    public desbloquearCampos: boolean = false;
    public telaEdicao: boolean = false;

    constructor(private router: Router,
        private categoriaService: CategoriaService,
        private activatedRoute: ActivatedRoute,
        private contatoService: ContatoService,
        private confirmationService: ConfirmationService) {

        this.configCalendario = this.configCalander();
        this.pessoa = [
            { label: 'Selecione', value: '' },
            { label: 'CPF', value: 'CPF' },
            { label: 'CNPJ', value: 'CNPJ' }
        ];


        this.usuarioFuncao = getFuncaoUsuarioLogado().replace(/['"]+/g, '');

        if(this.usuarioFuncao == "VENDEDOR"){
            this.usuarioFuncao = null;
        }

    }

    ngOnInit() {
        
        this.activatedRoute.params.subscribe(parametro => {
            if (parametro['id'] == undefined) {
                this.titulo = 'CADASTRO DE CONTATO';
                this.desbloquearCampos = true;
                this.telaEdicao = false;
            }
            else {

                this.titulo = 'EDITAR CADASTRO DE CONTATO';
                this.contatoService.get(Number(parametro['id'])).subscribe((res) => {

                    this.contato = res;
                    this.contato.dataNascimento = new Date(this.contato.dataNascimento);
                    this.idCategoria = this.contato.categoria.id;
                    
                    this.telaEdicao = true;

                    if (this.contato.cpf) {
                        this.option = 'CPF';
                    }
                    if (this.contato.cnpj) {
                        this.option = 'CNPJ';
                    }

                    if (this.contato.autorizaEmail) {
                        this.optAutorizaEmail = 'autorizo';

                    } else if (!this.contato.autorizaEmail) {
                        this.optAutorizaEmail = 'naoAutorizo';
                    }

                });
            }
        });

        this.categoriaService.listar().subscribe((res) => {
            this.categorias = res;
        });
    }

    registro() {
        this.router.navigate(['cadastros/chamada']);
    }

    editar() {
        this.desbloquearCampos = true;
    }

    salvar() {

        if (this.option === 'CPF' && this.contato.cpf && !validarCPF(this.contato.cpf)) {
            this.msgs.push({ severity: 'info', summary: '', detail: 'O CPF digitado não é válido!' });
            return;
        }

        if (this.option === 'CNPJ' && this.contato.cnpj && !validarCNPJ(this.contato.cnpj)) {
            this.msgs.push({ severity: 'info', summary: '', detail: 'O CNPJ digitado não é válido!' });
            return;
        }

        if (!this.contato.nome || !this.contato.dataNascimento || !this.contato.endereco || !this.contato.celular || !this.optAutorizaEmail || !this.idCategoria) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Warn Message', detail: 'Campos obrigatórios não preenchidos' });

        } else if (!this.verificaDataNascimento()) {

            this.msgs = [];
            this.msgs.push({
                severity: 'error',
                summary: 'Warn Message',
                detail: 'O contato deve ter idade igual ou superior a 18 anos'
            });

        } else {

            if (this.contato.id == undefined) {

                if (this.optAutorizaEmail == 'autorizo') {
                    this.contato.autorizaEmail = true;
                }
                if (this.optAutorizaEmail == 'naoAutorizo') {
                    this.contato.autorizaEmail = false;
                }

                if (this.contato.cpf) {
                    this.contato.cpf = this.removerMascara(this.contato.cpf);
                }

                if (this.contato.cnpj) {
                    this.contato.cnpj = this.removerMascara(this.contato.cnpj);
                }
                this.msgs = [];
                this.contatoService.salvar(this.montarBody()).subscribe(res => {
                    this.msgs.push({
                        severity: 'success',
                        summary: 'Service Message',
                        detail: 'Dados salvos com sucesso!'
                    });

                    this.contato = new Contato();

                }, erro => {
                    this.msgs.push({
                        severity: 'info',
                        summary: '',
                        detail: 'Já existe um contato cadastrado com esse CPF!'
                    });
                });
            } else {

                if (this.optAutorizaEmail == 'autorizo') {
                    this.contato.autorizaEmail = true;
                }
                if (this.optAutorizaEmail == 'naoAutorizo') {
                    this.contato.autorizaEmail = false;
                }

                this.confirmationService.confirm({
                    message: 'Deseja realmente salvar alterações ?',
                    header: 'Confirmation',
                    icon: 'fa fa-trash',
                    accept: () => {

                        if (this.contato.cpf) {
                            if (this.contato.cpf.toString().length > 11) {
                                this.contato.cpf = this.removerMascara(this.contato.cpf);
                            }

                        }

                        if (this.contato.cnpj) {
                            if (this.contato.cnpj.toString().length > 14) {
                                this.contato.cnpj = this.removerMascara(this.contato.cnpj);
                            }

                        }

                        this.contatoService.alterar(this.montarBody(), this.contato.id).subscribe(() => {

                            this.msgs = [];
                            this.msgs.push({
                                severity: 'success',
                                summary: 'Service Message',
                                detail: 'Dados alterados com sucesso!'
                            });

                        }, () => {
                            this.msgs.push({
                                severity: 'info',
                                summary: '',
                                detail: 'Já existe um contato cadastrado com esse CPF!'
                            });
                        });


                    },
                    reject: () => {
                        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
                    }
                });
            }

        }
    }

    excluir() {
        this.msgs = [];
        this.confirmationService.confirm({
            message: 'Deseja realmente excluir este contato ?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.contatoService.excluir(this.contato.id).subscribe(res => {
                    this.msgs = [];
                    this.msgs.push({
                        severity: 'success',
                        summary: 'Service Message',
                        detail: 'Dados excluidos com sucesso!'
                    });

                    this.contatoService.listar().subscribe((res) => {
                        this.contato = res;
                    });

                });
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            }
        });
    }

    voltar() {
        this.router.navigate(['/cadastros/contato']);
    }

    verificaDataNascimento(): boolean {
        let dataAtual = new Date();
        let diferenca = dataAtual.getFullYear() - this.contato.dataNascimento.getFullYear();

        if (diferenca > 18) {
            return true;
        } else if (diferenca == 18) {
            if (dataAtual.getMonth() > this.contato.dataNascimento.getMonth()) {
                return true;

            } else if (dataAtual.getMonth() == this.contato.dataNascimento.getMonth()) {

                return (dataAtual.getDay() > this.contato.dataNascimento.getDay())
            }
        }
    }

    montarBody() {
        return {
            'contato':
            {
                'nome': this.contato.nome,
                'autorizaEmail': this.contato.autorizaEmail,
                'celular': this.contato.celular,
                'cnpj': this.contato.cnpj,
                'cpf': this.contato.cpf,
                'dataNascimento': this.contato.dataNascimento,
                'email': this.contato.email,
                'endereco': this.contato.endereco,
                'telefoneFixo': this.contato.telefoneFixo,
                'categoria': { 'id': this.idCategoria },
                'usuario': { 'id': getIdUsuarioLogado() }
            }
        };
    }

    removerMascara(valor) {
        return valor.replace(/(\.|\/|\-)/g, '');
    }

    private configCalander() {
        return {
            closeText: 'Fechar',
            prevText: 'Anterior',
            nextText: 'Próximo',
            currentText: 'Começo',
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            weekHeader: 'Semana',
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: '',
            timeOnlyTitle: 'Só Horas',
            timeText: 'Tempo',
            hourText: 'Hora',
            minuteText: 'Minuto',
            secondText: 'Segundo',
            ampm: false,
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            allDayText: 'Todo o Dia'
        };
    }

}
