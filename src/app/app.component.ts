import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <svg-icon class="icon angular-icon" [src]="'angular'"></svg-icon>

    <svg-icon class="icon nodejs-icon" [src]="'nodejs'"></svg-icon>

    <svg-icon class="icon power-icon" [src]="'power'"></svg-icon>

    <svg-icon class="icon youtube-icon" [src]="'youtube'"></svg-icon>

    <svg-icon class="icon apple-icon" [src]="'apple'"></svg-icon>

    <svg-icon class="icon heart-icon" [src]="'heart'"></svg-icon>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
