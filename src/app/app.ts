import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
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
  readonly isHandset = signal(false);

  constructor() {
    this.breakpoint.observe(['(max-width: 768px)']).subscribe(result => {
      this.isHandset.set(result.matches);
    });
  }
}
