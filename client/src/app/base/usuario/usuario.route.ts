import { Route } from '@angular/router';

import { CadastroUsuarioComponent } from './cadastro/cadastro-usuario.component';
import { ListagemUsuarioComponent } from './listagem/listagem-usuario.component';

export const UsuarioRoute: Route[] = [
    
    {path: 'cadastros/usuario' , component: ListagemUsuarioComponent},
    {path: 'cadastros/usuario/novo', component: CadastroUsuarioComponent},
    {path: 'cadastros/usuario/edicao/:id', component: CadastroUsuarioComponent}

]

