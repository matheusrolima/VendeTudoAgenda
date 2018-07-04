import {Component, Inject, OnInit} from '@angular/core';
import {LoginRequest} from './login.request.model';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/platform-browser';
import {LoginService} from './login.service';
import {setFuncaoUsuarioLogado, setIdUsuarioLogado, setUsuarioLogado} from '../arquitetura/servico/base.service';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    msgs: Message[] = [];
    loginRequest: LoginRequest = new LoginRequest();

    constructor(@Inject(DOCUMENT) private document: Document,
                private messageService: MessageService,
                private router: Router,
                private loginService: LoginService) {
    }

    logar() {
        if (!this.loginRequest.email || !this.loginRequest.senha) {
            this.msgs = [];
            this.msgs.push({severity: 'warn', summary: 'Warn Message', detail: 'Campos obrigatórios'});

        }
        else {
            this.loginService.logar(this.loginRequest).subscribe((usuario) => {
                setUsuarioLogado(usuario.token);
                setIdUsuarioLogado(usuario.id);
                setFuncaoUsuarioLogado(usuario.funcao);
                this.document.body.classList.remove('back-login');
                this.router.navigate(['/principal']);

            }, (usuarioError) => {
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Usuário e/ou senha inválido'});

            });
        }
    }

    esqueciSenha() {
        this.loginService.resetarSenha(this.loginRequest.email).subscribe(result=>{
            this.msgs = [];
            this.msgs.push({severity: 'sucess', summary: '', detail: 'Uma nova senha foi gerada e enviada para o seu e-mail'});
        }, erro =>{
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Não encontramos um usuário com este e-mail'});
        });
    }

    ngOnInit(): void {
        this.document.body.classList.add('back-login');
    }

}