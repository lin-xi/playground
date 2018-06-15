import './componentList.less'

import Card from './ComponentCard'

export default {
  props: {
    comType: {
      type: String,
      default: 'library'
    },
    comsData: {
      type: Array,
      default: () => [],
      require: true
    }
  },

  components: {
    'w-component-card': Card
  },

  render (h) {
    let comType = this.comType
    return (
      <div class='compo-list-wrapper'>
        {
          this.comsData.map((item) => {
            return h('w-component-card', {props: {...item, comType}})
          })
        }
      </div>
    )
  }

}
