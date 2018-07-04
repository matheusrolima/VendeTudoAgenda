import {Headers, RequestOptionsArgs} from '@angular/http';

export function getUsuarioLogado() {

    return localStorage.getItem('token')
}

export function getIdUsuarioLogado(){

    return localStorage.getItem('usuarioId');
}

export function getFuncaoUsuarioLogado(){

    return localStorage.getItem('usuarioFuncao');
}

export function setUsuarioLogado(token:any) {

    localStorage.setItem('token', JSON.stringify(token));

}

export function setIdUsuarioLogado(id:number){
    
    localStorage.setItem('usuarioId', JSON.stringify(id));
}

export function setFuncaoUsuarioLogado(funcao : any){

    localStorage.setItem('usuarioFuncao', JSON.stringify(funcao));
    
}

export class BaseService {

    protected config(): RequestOptionsArgs {
        return {
            headers: this.buildHeaders()
        }
    }

    protected configLogin(): RequestOptionsArgs {
        return {
            headers : this.buildHeadersLogin()
        }
    } 

    protected buildHeaders() : Headers{
     
        var token = localStorage.getItem('token');
        token = token.replace(/['"]+/g,'');
        
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

    }

    protected buildHeadersLogin() : Headers{
        return new Headers({
            'Content-Type': 'application/json',
        });
    }

    protected mapper(resp) {
        try {
            return (resp.json() || resp.text());

        } catch (error) {
            return resp;
        }

    }
}