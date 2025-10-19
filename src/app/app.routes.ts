import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
			loadComponent: () => import('./pages/dashboard').then(m => m.DashboardComponent)
	},
	{
		path: 'lancamentos',
			loadComponent: () => import('./pages/lancamentos').then(m => m.LancamentosComponent)
	},
	{ path: '**', redirectTo: '' }
];
