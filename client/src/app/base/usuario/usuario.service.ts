import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Servico} from '../../arquitetura/servico/servico';
import {Usuario} from '../modelo/usuario.model';

@Injectable()
export class UsuarioService extends Servico<Usuario> {

    constructor(http: Http) {
        super('usuarios', http);
    }

    listar(): Observable<any> {
        return this.http.get(`${environment.baseUrl}/usuarios`, this.config());
    }

}
