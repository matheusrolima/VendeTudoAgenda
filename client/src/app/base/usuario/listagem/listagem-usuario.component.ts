import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Message} from 'primeng/api';
import {Usuario} from '../../modelo/usuario.model';
import {UsuarioService} from '../usuario.service';
import {getFuncaoUsuarioLogado} from '../../../arquitetura/servico/base.service';

@Component({
    selector: 'app-listagem-usuario',
    templateUrl: './listagem-usuario.component.html',
    styles: []
})
export class ListagemUsuarioComponent implements OnInit {
    usuarios: Array<any>;
    selectedUsuario: Usuario;
    msgs: Message[] = [];
    usuarioAutorizado: boolean = false;

    constructor(private usuarioService: UsuarioService,
                private router: Router) {

        this.usuarioAutorizado = ((getFuncaoUsuarioLogado().replace(/['"]+/g, '')) === 'ADMINISTRADOR');
    }

    ngOnInit() {
        this.listarUsuarios();
    }

    novo(): void {
        this.router.navigate(['/cadastros/usuario/novo']);
    }

    editar(): void {
        if (!this.selectedUsuario) {
            this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Selecione um usuário dá lista'});

        } else {
            this.router.navigate(['/cadastros/usuario/edicao/', this.selectedUsuario.id]);

        }
    }

    excluir(): void {
        this.msgs = [];
        if (!this.selectedUsuario) {
            this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Selecione um usuário dá lista'});

        } else {
            this.usuarioService.excluir(this.selectedUsuario.id).subscribe(result => {
                this.selectedUsuario = null;
                this.msgs.push({severity: 'success', summary: 'Service Message', detail: 'Dados excluidos com sucesso!'});
                this.listarUsuarios();

            });
        }
    }

    voltarTelaPrincipal(): void {
        this.router.navigate(['/principal']);
    }

    listarUsuarios() {
        this.usuarioService.listar().subscribe(result => {
            let usuarios = JSON.parse(result._body);
            this.usuarios = usuarios;
        });
    }
}
