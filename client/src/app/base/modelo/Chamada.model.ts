import { Entidade } from "../../arquitetura/modelo/entidade.model";

export class Chamada extends Entidade {
    nome:string;
    data: Date;
    duracao: String;
    descricao: String;

    constructor() {
        super();
        this.nome =  '';
        this.duracao = '';
        this.descricao = '';
    }


}