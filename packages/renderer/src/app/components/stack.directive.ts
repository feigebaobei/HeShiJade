import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appStack]'
})
export class StackDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
