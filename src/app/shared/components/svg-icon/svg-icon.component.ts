import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, filter, Subject, switchMap, takeUntil } from 'rxjs';
import { SvgService } from '../../services';

@Component({
  selector: 'svg-icon',
  template: '',
})
export class SvgIconComponent implements OnChanges, OnInit, OnDestroy {
  @Input()
  src: string;

  private readonly svgSrc = new BehaviorSubject<string>(undefined);
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private svgService: SvgService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('src' in changes) {
      this.svgSrc.next(this.src);
    }
  }

  ngOnInit(): void {
    this.svgSrc
      .pipe(
        filter(Boolean),
        switchMap(() => this.svgService.isInitialized$),
        filter(Boolean),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => this.loadSvg(this.src));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadSvg(src: string): void {
    const svgElement = this.svgService.getSvg(src);

    this.elementRef.nativeElement.innerHTML = null;
    this.elementRef.nativeElement.appendChild(svgElement);
  }
}
