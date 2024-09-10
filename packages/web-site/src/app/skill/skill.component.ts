import { Component, effect } from '@angular/core';
import { ShareSignalService } from '../service/share-signal.service';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.sass'
})
export class SkillComponent {
  data: ShareSignalService<any>
  data2: ShareSignalService<any>
  str: string
  str2: string
  constructor() {
    this.data = new ShareSignalService('2')
    this.data2 = new ShareSignalService(2)
    this.str = ''
    this.str2 = ''
    effect(() => {
      this.str = `cur value: ${this.data.get()}`
    })
    effect(() => {
      this.str2 = `cur value: ${this.data2.get()}`
    })
  }
  addH() {
    this.data.set(this.data.get() + 1)
  }
  addH2() {
    this.data2.set(this.data2.get() + 1)
  }

}
