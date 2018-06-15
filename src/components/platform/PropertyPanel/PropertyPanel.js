import './propertyPanel.less'

import PropertyForm from './PropertyForm'
import {Tabs, TabPane, Message} from 'element-ui'

const iconCopy = require('../../../assets/images/icon-copy.svg')
const iconDelete = require('../../../assets/images/icon-delete.svg')

export default {
  name: 'xp-property-panel',
  components: {
    'el-tabs': Tabs,
    'el-tab-pane': TabPane
  },

  data () {
    return {
      activeTab: 'component'
    }
  },

  render (h) {
    return (
      <div class='property-panel'>
        <el-tabs type='border-card' active-name={this.activeTab}>

          <el-tab-pane label='组件属性' name='component'>
            <div class='propertyPanel'>
              <div class='component-tool'>
                <a on-click={this.compoCopy}><img src={iconCopy} />复制</a>
                <a on-click={this.compoRemove}><img src={iconDelete} />移除</a>
              </div>
              <PropertyForm />
            </div>
          </el-tab-pane>

        </el-tabs>
      </div>
    )
  },

  methods: {

    valueChange (e) {
      let tar = e.target
      if (!tar.value) {
        // Message({
        //   message: '名称不能为空',
        //   type: 'warning'
        // })
      }
      // api.updateModel({
      //   model_id: this.$root.modelId,
      //   model_name: tar.value
      // }).then(result => {
      //   Message({
      //     message: '更新成功',
      //     type: 'warning'
      //   })
      // })
    },


    compoCopy (e) {
      eventHub.$emit('xp-com-copy')
    },

    compoRemove () {
      eventHub.$emit('xp-com-delete')
    },

    compoSave () {
      eventHub.$emit('xp-widget-save')
    }
  },

  beforeDestroy () {
    eventHub.$off('show-property')
    eventHub.$off('show-body-property')
    eventHub.$off('show-model-property')
  }

}
