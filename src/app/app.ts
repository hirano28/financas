import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf, MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('financas');
  private readonly breakpoint = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly isHandset = signal(false);
  readonly pageTitle = signal<string>('');

  constructor() {
    this.breakpoint.observe(['(max-width: 768px)']).subscribe(result => {
      this.isHandset.set(result.matches);
    });

    // Atualiza o título da página com base na rota ativa
    this.router.events.subscribe(() => {
      const current = this.getDeepestChild(this.route);
      const data = current?.snapshot?.data as { title?: string } | undefined;
      this.pageTitle.set(data?.title ?? '');
    });
  }

  private getDeepestChild(ar: ActivatedRoute): ActivatedRoute | null {
    let child: ActivatedRoute | null = ar;
    while (child?.firstChild) child = child.firstChild;
    return child;
  }
}
