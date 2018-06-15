import './componentPanel.less'

import ComponentList from 'components/platform/ComponentList/ComponentList'
import IconMenu from 'components/platform/ToolMenu/IconMenu'
import {Tabs, TabPane} from 'element-ui'

export default {
  props: {
    comsData: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    'el-tabs': Tabs,
    'el-tab-pane': TabPane
  },
  methods: {
    commonTabClick (tab, event) {
      this.commonTab = tab.name
    },
    businessTabClick (tab, event) {
      this.businessTab = tab.name
    },
    mineTabClick (tab, event) {
      this.mineTab = tab.name
    }
  },

  data () {
    return {
      common: [
        {
          name: 'Text',
          title: '文本',
          className: 'i-text',
          property: [
            {
              name: 'text',
              title: '值',
              type: 'text'
            }
          ]
        },
        {
          name: 'Image',
          title: '图片',
          className: 'i-image',
          property: [
            {
              name: 'src',
              title: '地址',
              type: 'text'
            }
          ]
        },
        {
          name: 'Block',
          title: '块',
          className: 'i-block',
          property: [
          ]
        },
        {
          name: 'Grid',
          title: '栅格',
          className: 'i-grid',
          property: [
          ]
        },
        {
          name: 'Cell',
          title: '单元格',
          className: 'i-grid',
          property: [
          ]
        }
      ]
    }
  },

  render (h) {
    return (
      <div class='componentPanel'>
        <div class='notice-area'>
          <IconMenu />
        </div>

        <div class='panel'>
          <el-tabs type='border-card' value='commonComponent1'>
            <el-tab-pane label='通用基础组件' name='commonComponent1'>
              <ComponentList comsData={this.common} comType='common' />
            </el-tab-pane>
          </el-tabs>
        </div>

        <div class='panel'>
          <el-tabs type='border-card' value='commonPanel'>
            <el-tab-pane label={this.comsData.name + ' 组件库'} name='commonPanel' >
              <ComponentList comsData={this.comsData.components} comType='lib' />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    )
  },

  beforeDestroy () {
    eventHub.$off('xp-widget-save')
    eventHub.$off('xp-add-component')
  }

}
