import { Component } from '@angular/core';
// import { TextareaModule } from 'ng-devui/textarea';

let clog = console.log

@Component({
  selector: 'app-plugins',
  standalone: true,
  imports: [
    // TextareaModule,
  ],
  templateUrl: './plugins.component.html',
  styleUrl: './plugins.component.sass'
})


export class PluginsComponent {
  constructor() {
    setTimeout( () => {
      this.getValue()
    }, 2000)
  }
  getValue() {
    let dom = document.querySelector('#textArea')
    if (dom) {
      let a = dom.innerHTML
      clog('a', a)
    }
  }
  uploadButtonClickH() {

//     var oFiles = document.getElementById("pop_file").files;
// var params = new FormData();
// params.append('file',oFiles[0]);
// $.ajax({
//     type:'post',
//     url:'http://api.tianshuai.com.cn/admin/BannerApi/actionBannerSave',
//     data:params,
//     cache: false,
//     contentType: false,
//     processData: false,
//     success:function(data){
//         console.log(data)
//     }
// })



    let formData = new FormData()
    let file: HTMLFormElement = document.querySelector('#file')!
    clog('file', file, file?.['files'])
    formData.append('pluginFile', file?.['files'][0])
    let handler = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        clog('success')
      }
    }
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:5000/plugins', true)
    clog('formData', formData)
    xhr.send(formData)
    xhr.onreadystatechange = handler



  }
}
