import { Component } from '@angular/core';
import { TagsModule } from 'ng-devui/tags';
import shareEvent, { createEventName } from 'src/helper/share-event';
import { TextBase } from 'src/helper/text';
import { B, S } from 'src/types/base';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    TagsModule,
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.sass'
})
export class TagComponent extends 
TextBase
// ListenItems 
{
  tags: {id: S, label: S, tip: S, labelStyle: S, checked: B}[]
  constructor() {
    super()
    this.tags = []
  }
  initTags() {
    this.tags = this.data.items.map(item => {
      return {
        id: item['id'],
        label: item['label'],
        tip: item['tip'],
        labelStyle: item['labelStyle'],
        checked: item['checked']
      }
    })
  }
  listen() {
        shareEvent.on(createEventName(this.data.type, this.data.ulid, 'items', 'add'), () => {
          this.initTags()
        })
        shareEvent.on(createEventName(this.data.type, this.data.ulid, 'items', 'update'), () => {
          this.initTags()
        })
        shareEvent.on(createEventName(this.data.type, this.data.ulid, 'items', 'remove'), () => {
          this.initTags()
        })
  }
  ngOnInit() {
    this.initTags()
    this.listen()
  }
}
