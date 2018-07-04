import { Injectable } from '@angular/core';
import { Servico } from '../../arquitetura/servico/servico';
import { Http } from '@angular/http';
import { Categoria } from '../modelo/categoria.model';

@Injectable()
export class CategoriaService extends Servico<Categoria> {

    constructor(http: Http){
        super('categorias', http);
    }
}
