import Vue from 'vue'
const FastClick = require('fastclick')
import ComponentTree from 'components/platform/common/ComponentTree'
let cache = {}

FastClick.attach(document.body)

export default {
  name: 'editor-panel',
  props: {
    modelId: {
      type: String,
      require: true
    },
    widgetId: {
      type: String,
      require: true
    },
    env: {
      type: String,
      default: 'production',
      require: false
    }
  },

  data () {
    return {
      componentsData: {
        treeData: {}
      }
    }
  },

  created () {
    let me = this
    if (window.__modelData) {
      this.componentsData = new ComponentTree(window.__modelData)
      this.emitModelName(document.title)
    } else if (window.parent && window.parent.__modelData) {
      this.componentsData = new ComponentTree(window.parent.__modelData)
      this.emitModelName(document.title)
    } else {
      if (this.modelId) {
        // api.getModel(this.modelId).then(result => {
        //   if (result.error_no == 0) {
        //     this.componentsData = new ComponentTree(result.result.model_detail.model_content)
        //     const modelName = result.result.model_name || result.result.model_detail.model_name
        //     this.emitModelName(modelName || document.title)
        //   }
        // })
      } else if (this.widgetId) {
        // api.getWidget(this.widgetId).then(result => {
        //   if (result.error_no == 0) {
        //     this.componentsData = new ComponentTree(result.result.widget_detail.widget_content)
        //   }
        // })
      }
    }

    eventHub.$on('xp-set-global-data', (data) => {
      me.componentsData.setData(data)
      me.$forceUpdate()
    })
    eventHub.$on('xp-global-add-component', (cid, com) => {
      me.componentsData.addComponent(cid, {
        title: '',
        name: com.name,
        path: com.path,
        props: com.props,
        children: []
      })
    })
    eventHub.$on('xp-global-update-component', (cid, props) => {
      me.componentsData.updateProps(cid, props)
      me.$forceUpdate()
    })
    eventHub.$on('xp-global-remove-component', (cid) => {
      me.componentsData.removeComponent(cid)
    })
    eventHub.$on('xp-global-update-children', (cid, children) => {
      me.componentsData.updateChildren(cid, children)
    })
  },

  render (h) {
    let me = this
    me.$root.modelData = me.componentsData.treeData
    return (
      <div class='preview-body' cid='0' style={me.componentsData.treeData.props}>
        {me.renderComponents(h)}
      </div>
    )
  },

  methods: {

    camalise (str) {
      return str.replace('(^\w)|-(\w)', (s0, s1) => {
        return s1.toUpperCase()
      })
    },

    emitModelName (modelName) {
      if (modelName) {
        setTimeout(function () {
          eventHub.$emit('modelName', modelName)
        }, 500)
      }
    },

    renderComponents (h) {
      let me = this
      let stack = []
      let result = []
      let root = JSON.parse(JSON.stringify(me.componentsData.treeData))
      if (!root.children) return
      for (var i = 0; i < root.children.length; i++) {
        let child = root.children[i]
        stack.push(child)
        let node
        while (stack.length > 0) {
          node = stack.pop()
          if (!cache[node.path]) {
            let clas = require('../../' + node.path)
            if (clas.default) {
              clas = clas.default
            }
            Vue.component(clas.name, clas)
            node.name = clas.name
            cache[node.path] = true
          }
          if (node.rendered) {
            let newProps = Object.assign({cid: node.cid}, node.props)
            let children = node.children.map(item => {
              return item.vnode
            })
            node.vnode = h(node.name, {
              attrs: {cid: node.cid},
              props: newProps
            }, children)
          } else if (node.children.length === 0) {
            node.rendered = true
            stack.push(node)
          } else {
            let count = 0
            for (var j = 0; j < node.children.length; j++) {
              if (!node.children[j].rendered) {
                if (count == 0) {
                  stack.push(node)
                }
                count++
                stack.push(node.children[j])
              }
            }
            if (count == 0) {
              node.rendered = true
              stack.push(node)
            }
          }
        }
        result.push(node.vnode)
      }
      return result
    }

  },

  watch: {
    componentsData () {
    }
  },

  mounted () {
    if (this.$el.offsetHeight < window.innerHeight) {
      this.$el.style.minHeight = window.innerHeight + 'px'
    }
    this.newSak({
      daSrc: 'page.PV',
      daAct: 'show',
      daTrace: ''
    })
    this.sakFrom()
  }

}
