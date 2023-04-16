import { Injectable } from '@angular/core';
import { SpriteLoaderService } from '../sprite-loader/sprite-loader.service';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class SvgService {
  private svgSprite: SVGSVGElement;
  private readonly isSpriteInitialized$ = new BehaviorSubject<boolean>(false);

  constructor(private spriteLoaderService: SpriteLoaderService) {
    if (!this.svgSprite) {
      this.initializeSprite();
    }
  }

  get isInitialized$(): Observable<boolean> {
    return this.isSpriteInitialized$;
  }

  getSvg(iconName: string): SVGSVGElement {
    const svgElement = this.getSvgElement(iconName);

    if (!svgElement) {
      throw new Error(`Icon with name ${ iconName } not found`);
    }

    return svgElement;
  }

  private async initializeSprite(): Promise<void> {
    const svgSprite = await firstValueFrom(this.spriteLoaderService.getSvgSprite());

    const div = document.createElement('div');
    div.innerHTML = svgSprite;

    this.svgSprite = div.children[0].cloneNode(true) as SVGSVGElement;
    this.isSpriteInitialized$.next(true);
  }

  private getSvgElement(iconName: string): SVGSVGElement {
    return this.svgSprite.getElementById(iconName)
      ?.cloneNode(true) as SVGSVGElement;
  }
}
