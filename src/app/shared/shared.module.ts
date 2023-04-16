import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './components';
import { SpriteLoaderService, SvgService } from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [SvgIconComponent],
  providers: [
    SpriteLoaderService,
    {
      provide: 'SVG_SPRITE_PATH',
      useValue: './assets/sprite/svg-sprite.svg',
    },
  ],
  exports: [
    SvgIconComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [SvgService],
    };
  }
}
