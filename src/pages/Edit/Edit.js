import './edit.less'

import utils from 'utils'
import ComponentPanel from 'components/platform/ComponentPanel/ComponentPanel'
import EditorPanel from 'components/platform/EditorPanel/EditorPanel'
import PropertyPanel from 'components/platform/PropertyPanel/PropertyPanel'
import CodePanel from 'components/platform/CodePanel/CodePanel'
import ToolMenu from 'components/platform/ToolMenu/ToolMenu'

import LOGO from '../../assets/images/logo.png'

export default {
  props: {
    comsData: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  created () {
    eventHub.$on('publish-page', (code) => {
      this.code = code
      this.codeShow = !this.codeShow
    })
  },

  data () {
    return {
      showLoading: false,
      role: 'manager',
      username: 'admin',
      pageData: {},
      codeShow: false,
      code: ''
    }
  },

  methods: {
    showLeft () {
      this.$refs.leftScreen.style.flex = '0 0 300px'
    },
    hideLeft () {
      this.$refs.leftScreen.style.flex = '0 0 0'
    }
  },

  render (h) {
    return (
      <div class='edit-page'>
        <div class='header'>
          <span class='logo'>
            <img src={LOGO} />
          </span>
          <div class='tools-menu'>
            <ToolMenu />
          </div>
        </div>
        <div class='fulll-screen' ref='fs'>
          <div class='left-screen' ref='leftScreen'>
            <ComponentPanel comsData={this.comsData} />
          </div>
          <div class='center-screen'>
            <EditorPanel comsData={this.comsData} />
          </div>
          <div class='right-screen'>
            <PropertyPanel />
            <transition name='slide-fade'>
              <CodePanel v-show={this.codeShow} value={this.code} />
            </transition>
          </div>
          <div class='view-tool' >
            <span>视图：</span>
            <span class='three-colum' on-click={this.showLeft}><i /><i /><i /></span>
            <span class='two-colum' on-click={this.hideLeft}><i /><i /></span>
          </div>
        </div>
      </div>
    )
  },

  mounted () {
    this.$refs.fs.style.height = window.innerHeight - 80 + 'px'
  }
}
