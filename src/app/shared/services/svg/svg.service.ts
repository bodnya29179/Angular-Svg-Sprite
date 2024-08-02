import { Injectable } from '@angular/core';
import { SpriteLoaderService } from '../sprite-loader/sprite-loader.service';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

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
    const svgElement = this.svgSprite.getElementById(iconName) as SVGSVGElement;

    return this.makeUniqueIds(svgElement);
  }

  private makeUniqueIds(svgElement: SVGSVGElement): SVGSVGElement {
    if (!svgElement) {
      return svgElement;
    }

    const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
    const gradients = clonedSvg.querySelectorAll('linearGradient, radialGradient');

    if (gradients.length) {
      const uniqueSuffix = uuidv4();

      gradients.forEach((gradient) => {
        const oldId = gradient.id;
        const newId = oldId + uniqueSuffix;
        gradient.id = newId;

        this.setUniqueId(clonedSvg, 'fill', oldId, newId);
        this.setUniqueId(clonedSvg, 'stroke', oldId, newId);
      });
    }

    return clonedSvg;
  }

  private setUniqueId(svgElement: SVGSVGElement, property: 'fill' | 'stroke', oldId: string, newId: string): void {
    const elements = svgElement.querySelectorAll(`[${property}="url(#${oldId})"]`);

    if (!elements.length) {
      return;
    }

    elements.forEach((element) => {
      const propertyUrl = element.getAttribute(property);

      if (propertyUrl && propertyUrl.includes(oldId)) {
        element.setAttribute(property, `url(#${newId})`);
      }
    });
  }
}
