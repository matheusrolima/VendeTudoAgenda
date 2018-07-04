import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login/login.guard';

import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CadastroUsuarioComponent } from './base/usuario/cadastro/cadastro-usuario.component'

import {UsuarioRoute} from '../app/base/usuario/usuario.route';
import {LoginComponent} from './login/login.component';
import { HomeRoute } from './base/home/home.route';
import { AppComponent } from './app.component';
import { ContatoRoute } from './base/contato/contato.route';
import { ChamadaRoute } from './base/chamada/chamada.route';
import { CategoriaRoute } from './base/categoria/categoria.route';
export const routes: Routes = [
    {
        canActivate: [LoginGuard],
        path: '', children: [
            {path: '', component: AppComponent},
            ...HomeRoute,
            ...UsuarioRoute,
            ...ContatoRoute,
            ...ChamadaRoute,
            ...CategoriaRoute
        ]
    },

    {path: 'login', component: LoginComponent}
    
];

export const ClienteRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {useHash:true});