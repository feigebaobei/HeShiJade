||完成日期||
|-|-|-|
|组件嵌套|||
|配置项中增强可切换功能|||
|设置版本号，用于设置配置文件升级。|||
|整理component为module|||
|整理数据结构的文档|||
|解决创建页面成功但是提示错误的问题|||
|解决新创建页面新创建的组件无法正常显示的问题|||
|解决删除组件控制前后组件错误的问题|||
|添加新组件时，及时在舞台上显示。|||
||||

props 一对kv就能搞定的
item 子元素
slot 子组件
meta 保存在数据库中，渲染组件时使用
config 配置面板中使用


做收敛。
组件做通用。若干组件收敛为一个组件。
若干用法中，指定一种用法。
api只暴露几个用户关心的、使用简单的api.

组件的几个阶段
|||||
|-|-|-|-|
|stage0|在富代码环境中，开发使用。|||
|stage1|抽象为通用组件。与业务无关，与技术有关。|||
|stage2|在lc项目中开发此组件，设置相关配置项。|||
|stage3||||
|stage4||||


## signal
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSignalService {
  private data = signal('');

  setData(update: string) {
    this.data.set(update);
  }

  getData(){
    return this.data;
  }
}

import { Component } from '@angular/core';
import { DataSignalService } from '../data.service';

@Component({
  selector: 'app-sender-signal',
  template: `
    <h3>Sender Component</h3>
    <button (click)="sendData()">Send Data</button>
  `,
})
export class SenderSignalComponent {
  constructor(private dataService: DataSignalService) {}

  sendData() {
    this.dataService.setData('Data from Sender Component');
  }
}

import { Component } from '@angular/core';
import { DataSignalService } from '../data.service';

@Component({
  selector: 'app-receiver-signal',
  template: `
    <h3>Receiver Component</h3>
    <p>{{ data() }}</p>
  `,
})
export class ReceiverSignalComponent {
  data;

  constructor(private dataService: DataSignalService) {
    this.data = this.dataService.getData();
  }
}