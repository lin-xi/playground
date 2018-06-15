import './minePage.less'

import Vue from 'vue'
import utils from 'utils'
import Panel from 'components/common/Panel/Panel'
import Qrcode from 'components/common/Qrcode/Qrcode'
import NewTemplate from 'components/platform/NewTemplate'
import Preview from 'components/platform/Preview/Preview'
import Header from 'components/platform/Header/Header'
import {Message} from 'element-ui'
import api from 'api'

const PREVIEW_MODE_ORIGIN = 'origin'
const PREVIEW_MODE_WM = 'waimai'
const PREVIEW_MODE_NUOMI = 'nuomi'

export default {
  created () {
    this.refresh()
  },

  data () {
    return {
      templateData: [],
      showView: false,
      modelId: '',
      previewURL: '',
      previewMode: '',
      currentTemplate: null
    }
  },

  components: {
    'xp-header': Header,
    'xp-qrcode': Qrcode
  },

  computed: {
    templates () {
      return this.templateData
    },
    mid () {
      return this.modelId
    },
    viewUrl () {
      const ONLINE_URL_AFFIX = 'http://waimai.baidu.com/static/h5/index.html'
      const PREVIEW_URL_AFFIX = `http://${location.host}/preview.html`
      let isOnline = !!(this.currentTemplate && this.currentTemplate.model_is_online)
      let previewURL = ''
      let time = Date.now()

      switch (this.previewMode) {
        case PREVIEW_MODE_ORIGIN:
          previewURL = isOnline
                        ? `${ONLINE_URL_AFFIX}?modelId=${this.modelId}&t=${time}`
                        : `${PREVIEW_URL_AFFIX}#/?modelId=${this.modelId}`
          this.previewURL = previewURL
          break
        case PREVIEW_MODE_WM:
          previewURL = isOnline
                        ? `${ONLINE_URL_AFFIX}?modelId=${this.modelId}&header=2&t=${time}`
                        : `${PREVIEW_URL_AFFIX}#/?modelId=${this.modelId}&header=2`
          this.previewURL = `bdwm://native?pageName=webview&url=${encodeURIComponent(previewURL)}`
          break
        case PREVIEW_MODE_NUOMI:
          previewURL = isOnline
                        ? `${ONLINE_URL_AFFIX}?from=nuomi#/?modelId=${this.modelId}&t=${time}`
                        : `${PREVIEW_URL_AFFIX}#/?modelId=${this.modelId}`
          this.previewURL = `bainuo://component?url=${encodeURIComponent(previewURL)}`
          break
      }
      return this.previewURL
    }
  },

  methods: {
    refresh () {
      api.getModelList().then(tmps => {
        if (tmps.error_no == 0) {
          this.templateData = tmps.result.model_list
          this.hideLoading()
        } else {
          utils.handlerError(tmps, this)
        }
      })
    },
    showTemplate (template, e) {
      let cur = e.currentTarget
      this.modelId = cur.getAttribute('modelId')
      this.currentTemplate = template
      this.$root.modelId = this.modelId
      this.showView = true
      window.__modelData = null
      this.previewMode = PREVIEW_MODE_ORIGIN
    },
    createTemplate (e) {
      NewTemplate()
    },
    copyModel (e) {
      api.copyModel(this.modelId).then(result => {
        this.refresh()
        this.showView = false
      })
    },
    editModel (e) {
      location.hash = '/edit?modelId=' + this.modelId
    },
    editData (e) {
      location.hash = '/editData?modelId=' + this.modelId
    },
    shareModel (e) {
      api.updateModel({
        model_id: this.modelId,
        model_is_public: 1
      }).then(result => {
        Message({
          message: '共享成功',
          type: 'success'
        })
      })
    },
    deleteModel (e) {
      this.$confirm('您确认删除该组件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteModel(this.modelId).then(result => {
          this.refresh()
          this.showView = false
        })
      })
    },
    closeView (e) {
      this.showView = false
    },
    updateThumb () {
      Message({
        message: '截图后台运行中，请耐心等待',
        type: 'success'
      })
      api.snapShot(this.modelId).then(res => {
        if (res.error_no == 0) {
          api.updateModel({
            model_id: this.$root.modelId,
            model_image: res.result.url
          }).then(ires => {
            Message({
              message: '缩略图更新成功',
              type: 'success'
            })
          })
        } else {
          utils.handleError(res, this)
        }
      })
    },
    getPreviewModeClassName (mode) {
      return mode === this.previewMode
                ? 'active' : ''
    },
    setPreviewMode (mode) {
      this.previewMode = mode
    },
    maidianTool () {
      let mid = this.modelId
      let link = encodeURIComponent(`http://waimai.baidu.com/static/h5/index.html?modelId=${mid}`)
      location.href = `http://family.waimai.baidu.com/fe/static/index.html#result/${link}`
    }
  },

  render (h) {
    return (
      <div class='mine-page'>
        <xp-header active='mineModel' />

        <div class={this.showView ? 'page-body blur' : 'page-body'}>

          <Panel title='我的模版'>
            <ul class='mine-template'>
              <li class='create-template-item' on-click={this.createTemplate}><i class='icon-create' /><p class='title'>创建模版</p></li>
              {
                                this.templates.map(item => {
                                  return (
                                    <li class='template-item' modelId={item.model_id}
                                      on-click={this.showTemplate.bind(this, item)}>
                                      <p class='cover'><img src={item.model_image} /></p>
                                      <p class='title' title={item.model_name}>{item.model_name}</p>
                                      {item.model_is_online == 1 ? <div class='online'>已上线</div> : ''}
                                    </li>
                                  )
                                })
                            }
            </ul>
          </Panel>
        </div>
        {
                    this.showView
                    ? <div class='view-page'>
                      <div class='model' />
                      <div class='view-box'>
                        <div class='phone-wrapper'>
                          <div class='phone-model'>
                            <div class='screen'>
                              <iframe class='frame' ref='previewIframe' src={'/preview.html?modelId=' + this.mid + '&t=' + Date.now()} />
                            </div>
                          </div>
                        </div>

                        <div class='operation'>
                          <div class='qrcode-area'>
                            <ul class='preview-mode-container'>
                              <li class={this.getPreviewModeClassName(PREVIEW_MODE_ORIGIN)}
                                on-click={this.setPreviewMode.bind(null, PREVIEW_MODE_ORIGIN)}>原始链接</li>
                              <li class={this.getPreviewModeClassName(PREVIEW_MODE_WM)}
                                on-click={this.setPreviewMode.bind(null, PREVIEW_MODE_WM)}>外卖客户端</li>
                              <li class={this.getPreviewModeClassName(PREVIEW_MODE_NUOMI)}
                                on-click={this.setPreviewMode.bind(null, PREVIEW_MODE_NUOMI)}>糯米客户端</li>
                            </ul>
                            <div class='qrcode'>
                              <xp-qrcode value={this.viewUrl} size={160} />
                            </div>
                                    地址：
                                    <div class='preview-url-container'>
                                      <a href={this.viewUrl} target='_blank'>{this.viewUrl}</a>
                                    </div>
                          </div>
                          <div class='btn-area'>
                            <p>
                              <span class='btn' on-click={this.copyModel}>复制模版</span>
                              <span class='btn' on-click={this.editModel}>编辑模版</span>
                              <span class='btn' on-click={this.editData}>配置数据</span>
                              <span class='btn' on-click={this.deleteModel}>删除模版</span>
                              <span class='btn' on-click={this.shareModel}>共享模版</span>
                              <span class='btn' on-click={this.updateThumb}>更新缩略图</span>
                            </p>
                            <p>
                              <a href={'#/minePublish?modelId=' + this.modelId}><span class='btn'>发布记录</span></a>
                            </p>
                            <p>
                              <span class='btn' on-click={this.maidianTool}>投放渠道埋点链接</span>
                              <span class='btn'>数据统计</span>
                            </p>
                          </div>
                        </div>

                        <div class='close' on-click={this.closeView}>✕</div>
                      </div>
                    </div>
                    : ''
                }
      </div>
    )
  }

}
