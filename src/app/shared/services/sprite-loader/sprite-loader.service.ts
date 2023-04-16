import { Inject, Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SpriteLoaderService {
  private readonly http: HttpClient;

  constructor(
    httpBackend: HttpBackend,
    @Inject('SVG_SPRITE_PATH') private svgSpritePath: string,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  getSvgSprite(): Observable<string> {
    return this.http.get(this.svgSpritePath, { responseType: 'text' });
  }
}
