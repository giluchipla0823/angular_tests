import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DatatablesDemoComponent } from './pages/datatables-demo/datatables-demo.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'datatables',
        component: DatatablesDemoComponent,
        canActivate: [AuthGuard]
    },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTES: ModuleWithProviders = RouterModule.forRoot(ROUTES);