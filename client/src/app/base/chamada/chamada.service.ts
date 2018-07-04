import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {BaseService} from '../../arquitetura/servico/base.service';
import {Chamada} from '../modelo/Chamada.model';
import {Categoria} from '../modelo/categoria.model';
import {Servico} from '../../arquitetura/servico/servico';

@Injectable()
export class ChamadaService extends Servico<Chamada> {

    constructor(http: Http) {
        super('chamadas', http);
    }

    listar(): Observable<any> {
        return this.http.get(`${environment.baseUrl}/chamadas`, this.config());
    }

    listarContatos(): Observable<any> {
        return this.http.get(`${environment.baseUrl}/contatoes`, this.config());
    }

    salvar(chamada: Chamada): Observable<any> {

        let body = JSON.stringify({
            chamada: {
                nome: chamada.nome,
                data: chamada.data,
                duracao: chamada.duracao,
                descricao: chamada.descricao
            }
        });

        return this.http.post(`${environment.baseUrl}/chamadas`, body, this.config());
    }
}
