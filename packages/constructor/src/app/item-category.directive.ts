import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appItemCategory]'
})
export class ItemCategoryDirective {

  // constructor() { }
  constructor(public viewContainerRef: ViewContainerRef) { }

}
