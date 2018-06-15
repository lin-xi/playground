import './form.less'
import Vue from 'vue'
import Items from './items'

export default {
  name: 'xp-form',

  props: {
    fields: {
      type: Array,
      default: [],
      require: true
    },
    change: {
      type: Function,
      require: true
    }
  },

  data () {
    return {
      componentsData: [],
      valuesData: {}
    }
  },

  mounted () {
    let coms = this.fields
    let changeFn = this.change

    if (coms) {
      let me = this
      coms.map((item, index) => {
        let com = Items[item.component]
        let alis = 'xp-' + me.toDash(item.component)
        if (!com) {
          console.log('😢😢😢组件加载失败［' + alis + ']')
          return
        }
        Vue.component(alis, com)

        let query = (name, value, source) => {
          if (name && value !== undefined) {
            let va = me.valuesData[name]
            if (va === value) {
              return
            }
            me.valuesData[name] = value
          }
          if (changeFn) {
            changeFn(me.valuesData)
          }
        }
        const data = {
          tag: alis,
          title: item.title,
          name: item.name,
          type: item.type,
          component: item.component,
          props: item.props,
          value: item.value != undefined ? item.value : item.default,
          valueChange: query
        }
        me.componentsData.push(data)
      })
    }
  },

  render (h) {
    return (
      <div class='compo-form'>
        {this.componentsData.map((item, index) => {
          let props = Object.assign(item, item.props)
          return h(item.tag, { props: props }, this.$slots.default)
        })}
      </div>
    )
  },

  methods: {
    toDash (str) {
      if (str) {
        str = str.replace(/[A-Z]/g, s0 => {
          return '-' + s0.toLowerCase()
        })
        return str.replace(/^-/, '')
      }
    }
  }
}
