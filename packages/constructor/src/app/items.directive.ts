import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appItems]'
})
export class ItemsDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
