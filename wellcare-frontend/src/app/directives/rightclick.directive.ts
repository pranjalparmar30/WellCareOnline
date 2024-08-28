import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appRightclick]'
})
export class RightclickDirective {
  @Output() rightClickEvent = new EventEmitter<any>();

  constructor() { }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.rightClickEvent.emit();
  }
}
