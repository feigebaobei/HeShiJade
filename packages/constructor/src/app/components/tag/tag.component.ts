import { Component } from '@angular/core';
import { TagsModule } from 'ng-devui';
import { ListenItems } from 'src/helper/ListenItems';
import shareEvent, { creatEventName } from 'src/helper/share-event';
import { TextBase } from 'src/helper/text';
import { S } from 'src/types/base';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [TagsModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.sass'
})
export class TagComponent extends 
TextBase
// ListenItems 
{
  tags: {id: S, label: S, tip: S, labelStyle: S}[]
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
      }
    })
  }
  listen() {
        shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'items', 'add'), () => {
          this.initTags()
        })
        shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'items', 'update'), () => {
          this.initTags()
        })
        shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'items', 'remove'), () => {
          this.initTags()
        })
  }
  ngOnInit() {
    this.initTags() 
    this.listen()
  }
}
