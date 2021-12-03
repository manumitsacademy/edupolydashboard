import { Component, ViewEncapsulation } from '@angular/core'

import Quill from 'quill'

import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-custom-toolbar',
  templateUrl: './custom-toolbar.component.html'
})
export class CustomToolbarComponent {
  modules = {}
  editorModel = [{
    attributes: {
      font: 'roboto'
    },
    insert: 'test'
  }]
  constructor(){
    this.modules = {
      formula: true,
      imageResize: {},
      syntax: true,
      toolbar: [['formula'], ['image'], ['code-block']]
    }
  }
}
