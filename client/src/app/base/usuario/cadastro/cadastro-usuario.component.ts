import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../modelo/usuario.model';
import {UsuarioService} from '../usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from 'primeng/api';
import {validarCPF} from '../../../arquitetura/Util';

@Component({
    selector: 'app-cadastro-usuario',
    templateUrl: './cadastro-usuario.component.html',
    styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
    public configCalendario: any;
    public usuario: Usuario = new Usuario();
    msgs: Message[] = [];

    constructor(private usuarioService: UsuarioService,
                private activateRoute: ActivatedRoute,
                private router: Router) {

        this.configCalendario = this.configCalander();
    }

    ngOnInit() {
        this.activateRoute.params.subscribe(parametro => {
            if (parametro['id']) {
                this.usuarioService.get(parametro['id']).subscribe(result => {
                    this.usuario = result;
                    this.usuario.confirmacaoSenha = this.usuario.senha;
                    this.usuario.dataNascimento = new Date(this.usuario.dataNascimento);
                });
            }
        });
    }

    salvar() {
        this.msgs = [];
        if (!validarCPF(this.usuario.cpf)) {
            this.msgs.push({severity: 'info', summary: '', detail: 'O CPF digitado não é válido!'});

        } else {
            if(this.usuario.senha.length < 8 || this.usuario.senha.length > 16) {
              this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'A senha deve conter entre 8 a 16 dígitos'}];
              this.usuario.senha = '';
              this.usuario.confirmacaoSenha = '';
            } else  if (this.usuario.senha !== this.usuario.confirmacaoSenha) {
                this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'As senhas não são iguais'}];
                this.usuario.senha = '';
                this.usuario.confirmacaoSenha = '';
            } else {
                this.usuario.cpf = String(this.usuario.cpf).replace(/\D/g, '');
                let usuario = JSON.stringify({
                    usuario: this.usuario
                });
                this.usuarioService.salvar(usuario).subscribe(
                    result => {
                        this.msgs.push({
                            severity: 'success',
                            summary: 'Service Message',
                            detail: 'Usuário salvo com sucesso!'
                        });

                    }, erro => {
                        this.msgs.push({
                            severity: 'info',
                            summary: '',
                            detail: 'Já existe um usuário cadastrado com esse CPF!'
                        });
                    });
            }
        }
    }

    voltar() {
        this.router.navigate(['/cadastros/usuario']);
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
