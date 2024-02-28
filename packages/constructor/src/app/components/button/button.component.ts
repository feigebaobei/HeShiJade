import { Component, Input, OnInit } from '@angular/core';
import type { A } from 'src/types/base';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements OnInit {
  @Input() data: A
  constructor() {
    
  }
  ngOnInit() {
    // console.log('button data', this)
    
  }
}
