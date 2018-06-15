import '../../css/theme-default/lib/index.css'
import '../../css/icomoon/style.css'
import './app.less'

import Vue from 'vue'
import mixin from '../../mixin'
import utils from '../../utils'
import Edit from '../Edit/Edit'
const json = require('../../../library.config.js')

Vue.mixin({
  methods: Object.assign(mixin, {
    isEditMode () {
      return true
    }
  })
})

export default Vue.component('App', resolve => {
  return Promise.resolve().then(resolve => {
    return utils.loadScript('https://unpkg.com/vue@2.5.16/dist/vue.min.js')
  }).then(resolve => {
    return utils.loadScript(json.url)
  }).then(resolve => {
    utils.loadStyle(json.style)
    return {
      render (h) {
        return (
          <div id='app'>
            <div class='body-container' ref='bd'>
              <Edit comsData={json} />
            </div>
            <div class='footer'>©2018 playground</div>
          </div>
        )
      }
    }
  })
})
