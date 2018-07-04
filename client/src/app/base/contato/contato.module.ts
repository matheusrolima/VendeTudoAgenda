import {NgModule} from '@angular/core';
import {CalendarModule, InputMaskModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {DataTableModule} from 'primeng/datatable';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GrowlModule} from 'primeng/growl';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {RadioButtonModule} from 'primeng/radiobutton';

import {ContatoCadastroComponent} from './cadastro/contato-cadastro.component';
import {ContatoListagemComponent} from './listagem/contato-listagem.component';
import {ContatoService} from './contato.service';

@NgModule({
    imports: [
        CheckboxModule,
        CalendarModule,
        ButtonModule,
        InputMaskModule,
        FormsModule,
        CommonModule,
        DropdownModule,
        BrowserAnimationsModule,
        TableModule,
        GrowlModule,
        DataTableModule,
        ConfirmDialogModule,
        RadioButtonModule

    ],
    declarations: [
        ContatoCadastroComponent,
        ContatoListagemComponent
    ],
    providers: [
        ContatoService,
        ConfirmationService
    ]
})
export class ContatoModule {
}