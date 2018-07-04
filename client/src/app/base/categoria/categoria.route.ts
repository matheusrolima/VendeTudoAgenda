import { Route } from '@angular/router';

import {CadastroCategoriaComponent} from './cadastro/cadastro-categoria.component';
import {ListagemCategoriaComponent} from './listagem/listagem-categoria.component';

export const CategoriaRoute: Route[] = [
    
  {path: 'cadastros/categoria' , component: ListagemCategoriaComponent},
  {path: 'cadastros/categoria/novo', component: CadastroCategoriaComponent},
  {path: 'cadastros/categoria/edicao/:id', component: CadastroCategoriaComponent}

]