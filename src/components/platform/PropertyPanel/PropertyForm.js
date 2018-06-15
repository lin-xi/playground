import './propertyPanel.less'
import Vue from 'vue'
import Items from 'components/common/Form/items'

const MAPS = {
  enum: 'InputSelect',
  text: 'InputText',
  number: 'InputNumber',
  color: 'InputColor',
  switch: 'InputSwitch',
  group: 'InputGroup',
  slider: 'InputSlider'
}

let cache = {}

export default {
  data () {
    return {
      cid: '',
      propsData: [],
      valuesData: {}
    }
  },

  created () {
    eventHub.$on('show-component-property', (mod) => {
      this.cid = mod.cid
      let ps = mod.property
      let np = ps.map(itm => {
        itm.value = mod.props[itm.name]
        return itm
      })
      this.propsData = np
    })
  },

  render (h) {
    return (
      <div class='property-form'>
        <div class='propertyPanel'>
          {
            this.propsData.map((item, i) => {
              let comName = MAPS[item.type]
              let com = Items[comName]
              let alis = 'w-' + this.toDash(comName)
              if (!com) {
                throw new Error('😢😢😢组件加载失败［' + alis + ']')
              }
              if (!cache[alis]) {
                Vue.component(alis, com)
                cache[alis] = true
              }
              item.valueChange = (name, value, source) => {
                if (name && value !== undefined) {
                  let va = this.valuesData[name]
                  if (va !== value) {
                    this.valuesData[name] = value
                    let val = {}
                    val[name] = value
                    eventHub.$emit('xp-com-property-change', this.cid, val)
                  }
                }
              }
              return <div class='line-item'><span class='label'>{item.title}</span>{h(alis, {props: item})}</div>
            })
          }
        </div>
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

    toDash (str) {
      if (str) {
        str = str.replace(/[A-Z]/g, s0 => {
          return '-' + s0.toLowerCase()
        })
        return str.replace(/^-/, '')
      }
    },

    find (treeData, cid) {
      let item
      function recurse (data, c) {
        let match = false
        if (data.cid === cid) {
          item = data
        } else {
          if (data.children.length > 0) {
            data.children.map(node => {
              recurse(node, c)
            })
          }
        }
      }
      recurse(treeData, cid)
      return item
    }

  },

  beforeDestroy () {
    eventHub.$off('show-property')
    eventHub.$off('show-body-property')
    eventHub.$off('show-model-property')
  }

}
