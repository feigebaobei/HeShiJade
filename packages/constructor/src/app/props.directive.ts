import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[propsHost]'
})
export class PropsDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
