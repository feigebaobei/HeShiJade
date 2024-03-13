import { Component, Input, OnInit } from '@angular/core';
import type { A, S } from 'src/types/base';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements OnInit {
  @Input() data: A
  text: S = 'button'
  constructor() {
  }
  ngOnInit() {
    this.text = this.data.items[0].text || 'button'
    console.log('button data', this, this.data)
  }
}
