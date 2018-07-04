import {Route} from "@angular/router";

import {ContatoCadastroComponent} from './cadastro/contato-cadastro.component';
import {ContatoListagemComponent} from './listagem/contato-listagem.component';

export const ContatoRoute: Route[] = [

    {path: 'cadastros/contato', component: ContatoListagemComponent },
    {path: 'cadastros/contato/novo', component:ContatoCadastroComponent},
    {path: 'cadastros/contato/edicao/:id', component:ContatoCadastroComponent}
]