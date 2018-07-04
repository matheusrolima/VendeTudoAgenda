import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//prime ng
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {GrowlModule} from 'primeng/growl';
import {InputTextModule} from 'primeng/inputtext';
import {DataTableModule} from 'primeng/datatable';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
//fim prime ng

import {CategoriaService} from './categoria.service';
import { ListagemCategoriaComponent } from './listagem/listagem-categoria.component';
import { CadastroCategoriaComponent } from './cadastro/cadastro-categoria.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    GrowlModule,
    ButtonModule,
    InputTextModule,
    DataTableModule,
    ConfirmDialogModule
  ],
  declarations: [
    CadastroCategoriaComponent,
    ListagemCategoriaComponent
  ],
  providers:[
    CategoriaService,
    ConfirmationService
  ]
})
export class CategoriaModule { }
