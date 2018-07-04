import {Injectable} from '@angular/core';
import {Servico} from '../../arquitetura/servico/servico';
import {Contato} from '../modelo/contato.model';
import {Http} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ContatoService extends Servico<Contato> {

    constructor(http: Http) {
        super('contatoes', http);
    }

    gerarRelatorio() {
        return this.http.get(`${environment.baseUrl}/gerarRelatorio`, this.config());
    }

    listarCpf(cpf: any): Observable<any> {
        return this.http.get(`${environment.baseUrl}/contatoes/cpf/${cpf}`, this.config())
            .map(this.mapper);
    }

    listarCnpj(cnpj: any): Observable<any> {
        return this.http.get(`${environment.baseUrl}/contatoes/cnpj/${cnpj}`, this.config())
            .map(this.mapper);
    }

    listarNome(nome: any): Observable<any> {
        return this.http.post(`${environment.baseUrl}/contatoes/nome`, nome, this.config())
            .map(this.mapper);
    }

    listarEmail(email: any): Observable<any> {
        return this.http.get(`${environment.baseUrl}/contatoes/email/${email}`, this.config())
            .map(this.mapper);
    }

    listarContatos(): Observable<any>{
        return this.http.get(`${environment.baseUrl}/contatosListagem`, this.config());
    }

}