import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
//import prime ng
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {GrowlModule} from 'primeng/growl';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CadastroChamadaComponent} from './cadastro/cadastro-chamada.component';
import {ListagemChamadaoComponent} from './listagem/listagem-chamada.component';
import {ChamadaService} from './chamada.service';
import {CalendarModule} from 'primeng/calendar';
import {DataTableModule} from 'primeng/datatable';
import { ConsultaChamadaComponent } from './consulta/consulta-chamada.component';

//end prime ng


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ButtonModule,
        InputTextModule,
        InputMaskModule,
        DropdownModule,
        TableModule,
        GrowlModule,
        CalendarModule,
        AutoCompleteModule,
        DataTableModule
    ],
    declarations: [
        CadastroChamadaComponent,
        ListagemChamadaoComponent,
        ConsultaChamadaComponent
    ],
    providers:[
        ChamadaService
    ]
})
export class ChamadaModule { }
