import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { UserClientComponent } from './pages/Staff/client-management/client-management.component';
import { UserManagementComponent } from './pages/Staff/user-management/user-management.component';
import { StorieLoansComponent } from './pages/Storie/storie-loans/storie-loans.component';
import { StorieMovesComponent } from './pages/Storie/storie-moves/storie-moves.component';
import { StorieReturnsComponent } from './pages/Storie/storie-returns/storie-returns.component';
import { StorieSearchComponent } from './pages/Storie/storie-search/storie-search.component';
import { DataExchangeComponent } from './pages/data-exchange/data-exchange/data-exchange.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { 
        path: 'navigation', 
        component: NavigationComponent,
        children: [
            { path: 'stafflist', component: UserClientComponent },
            { path: 'staffreg', component: UserManagementComponent },
            { path: 'storie-loans', component: StorieLoansComponent },
            { path: 'storie-moves', component: StorieMovesComponent },
            { path: 'storie-returns', component: StorieReturnsComponent },
            { path: 'storie-search', component: StorieSearchComponent },
            { path: 'data-exchange', component: DataExchangeComponent},
            
            { path: '', redirectTo: 'staffreg', pathMatch: 'full' },
            { path: '**', component: NotFoundComponent }
        ]
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];