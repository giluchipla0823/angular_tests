import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DatatablesDemoComponent } from './pages/datatables-demo/datatables-demo.component';

const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'datatables', component: DatatablesDemoComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTES: ModuleWithProviders = RouterModule.forRoot(ROUTES);