import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Disciplinas } from './disciplinas/disciplinas';
import { Inscripciones } from './inscripciones/inscripciones';
import { Admin } from './admin/admin';
import { Login } from './login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'disciplinas', component: Disciplinas },
    { path: 'inscripciones', component: Inscripciones },
    { path: 'admin', component: Admin, canActivate: [authGuard] },
    { path: 'login', component: Login },
];
