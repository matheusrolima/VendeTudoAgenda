import {Entidade} from '../../arquitetura/modelo/entidade.model';

export class Usuario extends Entidade {

    nome: string;
    cpf: string;
    email: string;
    dataNascimento: Date;
    endereco: string;
    telefoneFixo: string;
    celular: string;
    funcao: string;
    senha: string;
    confirmacaoSenha: string;

    constructor() {
        super();
    }
}