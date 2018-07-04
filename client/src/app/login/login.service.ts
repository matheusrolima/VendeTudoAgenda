import {BaseService} from '../arquitetura/servico/base.service';
import {Http} from '@angular/http';
import {LoginRequest} from './login.request.model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/catch';


export function clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioFuncao');

}

@Injectable()
export class LoginService extends BaseService {

    constructor(private http: Http) {
        super();
    }

    logar(loginRequest: LoginRequest): Observable<any> {
        let body = {'usuario': {'email': loginRequest.email, 'senha': loginRequest.senha}};

        return this.http.post(`${environment.baseUrl}/login`, body, this.configLogin())
            .map(this.mapper);
    }

    resetarSenha(email: string): Observable<any> {
        return this.http.post(`${environment.baseUrl}/resetarSenha`, email, this.configLogin());
    }
}