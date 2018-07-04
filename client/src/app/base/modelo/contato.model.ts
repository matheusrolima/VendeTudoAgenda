import {Entidade} from '../../arquitetura/modelo/entidade.model';
import {Categoria} from './categoria.model';
import {Chamada} from './Chamada.model';

export class Contato extends Entidade {
    
    nome:string;
    cpf: number;
    cnpj: number;
    email: string;
    dataNascimento: Date;
    endereco: string;
    telefoneFixo: string;
    celular: string;
    autorizaEmail: boolean;
    categoria:Categoria;
    ligacoes:Chamada;

    constructor(){
        super();
        this.categoria = new Categoria();
        this.ligacoes = new Chamada();
    }

}