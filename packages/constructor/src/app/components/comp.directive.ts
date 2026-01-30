import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[compHost]',
  standalone: true, // 独立组件需要与独立指令配合工作
})
export class CompDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

