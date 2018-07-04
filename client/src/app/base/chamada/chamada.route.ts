import { Route } from '@angular/router';

import {CadastroChamadaComponent} from "./cadastro/cadastro-chamada.component";
import {ListagemChamadaoComponent} from "./listagem/listagem-chamada.component";
import { ConsultaChamadaComponent } from './consulta/consulta-chamada.component';

export const ChamadaRoute: Route[] = [

    {path: 'cadastros/chamada' , component: ListagemChamadaoComponent, data:{title:'Chamada'}},
    {path: 'cadastros/chamada/novo', component: CadastroChamadaComponent},
    {path: 'cadastros/chamada/consulta/:id', component: ConsultaChamadaComponent}

]

