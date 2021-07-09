import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScroll]',
})
export class ScrollDirective {
  @Output() loadNextPage = new EventEmitter<any>();
  previousOffsetTop!: number;

  constructor() {}

  /**
   * Listens to the scroll event
   * @param $event scroll event
   */
  @HostListener('scroll', ['$event'])
  onScroll($event: any): void {
    const scrollOffset =
      $event.target.scrollHeight -
      $event.target.clientHeight -
      $event.target.scrollTop;

    if (
      scrollOffset <= 30 &&
      scrollOffset >= 10 &&
      this.previousOffsetTop - $event.target.scrollTop < 0
    ) {
      this.loadNextPage.emit();
    }

    this.previousOffsetTop = $event.target.scrollTop;
  }
}
