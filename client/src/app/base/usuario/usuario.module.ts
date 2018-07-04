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
import {CadastroUsuarioComponent} from './cadastro/cadastro-usuario.component';
import {ListagemUsuarioComponent} from './listagem/listagem-usuario.component';
import {UsuarioService} from './usuario.service';
import {DataTableModule} from 'primeng/datatable';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';

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
        AutoCompleteModule,
        GrowlModule,
        DataTableModule,
        CalendarModule,
        RadioButtonModule
    ],
    declarations: [
        CadastroUsuarioComponent,
        ListagemUsuarioComponent
    ],
    providers: [
        UsuarioService
    ]
})
export class UsuarioModule {
}
