import {BaseService} from "./base.service";
import {Entidade} from '../modelo/entidade.model';
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

export abstract class Servico<E extends Entidade> extends BaseService {

    constructor(
        protected path: string,
        protected http: Http){
        
        super();
    }

    protected url(path: string){
       return `${environment.baseUrl}/${this.path}/${path}`;
    }

    listar() : Observable<any> {

        return this.http.get(`${environment.baseUrl}/${this.path}`, this.config())
        .map(this.mapper);
    }

    get(id: number): Observable<E> {
 
        return this.http.get(`${environment.baseUrl}/${this.path}/${id}`, this.config() )
        .map(this.mapper);
    }

    salvar(entidade:any): Observable<string>{

        return this.http.post(`${environment.baseUrl}/${this.path}`, entidade, this.config())
        .map(this.mapper);
    }

    alterar(entidade: any, id: number): Observable<string>{

        return this.http.patch(`${environment.baseUrl}/${this.path}/${id}`, entidade, this.config())
        .map(this.mapper);
    }

    excluir(id: number): Observable<string>{

        return this.http.delete(this.url(`${id}`), this.config())
        .map(this.mapper);
    }

}