import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/dashboard').then(m => m.DashboardComponent),
		data: { title: 'Dashboard' }
	},
	{
		path: 'lancamentos',
		loadComponent: () => import('./pages/lancamentos').then(m => m.LancamentosComponent),
		data: { title: 'Lançamentos' }
	},
	{ path: '**', redirectTo: '' }
];
