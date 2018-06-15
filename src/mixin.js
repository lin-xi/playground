import ComponentTree from 'components/platform/common/ComponentTree'
let loading = null

const methods = {
  getCid () {
    if (this.cid) {
      return this.cid
    }
    if (this.$el) {
      let cid = this.$el.getAttribute('cid')
      if (!cid) {
        cid = this.$el.parentNode.getAttribute('cid')
      }
      return cid
    }
    return null
  },

  dispatchPropertyChange () {
    let cid = this.getCid()
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift(this.$options._componentTag + '|' + cid)
    args.unshift('xp-com-property-change')
    eventHub.$emit.apply(eventHub, args)
  },

  getModelData () {
    let cid = this.getCid()
    let tree = new ComponentTree(this.$root.modelData)
    return tree.find(cid)
  },

  addComponent (com) {
    let cid = this.getCid()
    eventHub.$emit('xp-global-add-component', cid, com)
  },

  removeComponent (cid) {
    eventHub.$emit('xp-global-remove-component', cid)
  },

  updateProps (cid, props) {
    eventHub.$emit('xp-global-update-component', cid, props)
  },

  setChildren (data) {
    let node = this.getModelData()
    eventHub.$emit('xp-global-update-children', node.cid, data)
  },

  get (opts) {
    return http.get(opts)
  },

  post (opts) {
    return http.post(opts)
  },

  nextZIndex () {
    if (this.$root.__zIndex) {
      ++this.$root.__zIndex
      return this.$root.__zIndex
    } else {
      this.$root.__zIndex = 100
      return this.$root.__zIndex
    }
  },

  emit (evt, ...params) {
    eventHub.$emit(evt, ...params)
  },

  on (evt, fn) {
    eventHub.$on(evt, (...params) => {
      fn && fn(...params)
    })
  },

  off (evt) {
    eventHub.$off(evt)
  },

  showLoading () {
    if (loading) return
    let mask = document.createElement('div')
    mask.className = '_p_loading'
    mask.innerHTML = `
        <div class="_p_loading">
            <p class="load">
                <span></span>
			    <img src="/public/images/deer.svg"/>
            <p>
		</div>`
    document.body.appendChild(mask)
    loading = mask
  },

  hideLoading () {
    if (loading) {
      loading.remove()
      loading = null
    }
  }

}

export default methods
