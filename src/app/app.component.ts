import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- Icons for changing colors by using ::ng-deep -->
    <svg-icon class="icon angular-icon" [src]="'angular'"></svg-icon>

    <svg-icon class="icon nodejs-icon" [src]="'nodejs'"></svg-icon>

    <svg-icon class="icon power-icon" [src]="'power'"></svg-icon>

    <svg-icon class="icon youtube-icon" [src]="'youtube'"></svg-icon>

    <svg-icon class="icon apple-icon" [src]="'apple'"></svg-icon>

    <svg-icon class="icon heart-icon" [src]="'heart'"></svg-icon>

    <!-- Linear gradient icons with unique gradient IDs -->
    <svg-icon class="icon" [src]="'linear-gradient'"></svg-icon>

    <svg-icon class="icon" [src]="'linear-gradient'"></svg-icon>

    <!-- Radial gradient icons with unique gradient IDs -->
    <svg-icon class="icon" [src]="'radial-gradient'"></svg-icon>

    <svg-icon class="icon" [src]="'radial-gradient'"></svg-icon>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
