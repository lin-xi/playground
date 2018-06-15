
const utils = {
  getQueryString (name) {
    var reg = new RegExp('(?:\\?|&)' + name + '=([^&]*)(?:&|$)', 'i')
    var r = window.location.href.match(reg)
    if (r != null) return decodeURIComponent(r[1])
    return ''
  },

  // 获取url中所有的参数
  getParams (url) {
    var vars = {}, hash, hashes, i
    url = url || window.location.href
    // 没有参数的情况
    if (url.indexOf('?') == -1) {
      return vars
    }
    hashes = url.slice(url.indexOf('?') + 1).split('&')
    for (i = 0; i < hashes.length; i++) {
      if (!hashes[i] || hashes[i].indexOf('=') == -1) {
        continue
      }
      hash = hashes[i].split('=')
      if (hash[1]) {
        vars[hash[0]] = (hash[1].indexOf('#') != -1) ? hash[1].slice(0, hash[1].indexOf('#')) : hash[1]
      }
    }
    return vars
  },

  getCookie (name) {
    var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr = document.cookie.match(reg)) { return unescape(arr[2]) } else { return null }
  },

  getValue (val) {
    if (val || val == 0) {
      val += ''
      if (val.indexOf('px') !== -1 ||
                val.indexOf('rem') !== -1 ||
                val.indexOf('%') !== -1) {
        return val
      } else {
        return val + 'px'
      }
    }
    return undefined
  },

  toProps (arr) {
    let props = {}
    arr.map(item => {
      if (item.component != 'split') {
        props[item.name] = {
          type: item.type,
          default: item.default,
          require: item.require
        }
      }
    })
    return props
  },

  toWatch (arr) {
    let watch = {}
    arr.map(item => {
      if (item.component != 'split') {
        watch[item.name] = function (val, oldVal) {
          this.update && this.update(item.name, val)
        }
      }
    })
    return watch
  },

  toData (arr, context) {
    return arr.map(item => {
      if (item.component != 'split' && item.component != 'none') {
        item.value = context[item.name]
      }
      return item
    })
  },

  toFormData (arr) {
    let props = {}
    arr.map(item => {
      if (item.component != 'split' && item.component != 'none') {
        props[item.name] = item.value
      }
    })
    return {formData: props}
  },

  loadScript (url) {
    return new Promise((resolve, reject) => {
      const doc = document
      const head = doc.head || (doc.getElementsByTagName('head')[0] || doc.documentElement)
      const node = doc.createElement('script')
      node.src = url
      node.onload = () => {
        resolve()
      }
      head.appendChild(node)
    })
  },

  loadStyle (url) {
    return new Promise((resolve, reject) => {
      const doc = document
      const head = doc.head || (doc.getElementsByTagName('head')[0] || doc.documentElement)
      const node = doc.createElement('link')
      node.rel = 'stylesheet'
      node.href = url
      head.appendChild(node)
      node.onload = () => {
        resolve()
      }
    })
  },

  requireImg (url) {
    let img = new Image()
    img.onload = () => {
      img = null
    }
    img.src = url
  },

  dashCase (str) {
    str = str.replace(/^([A-Z])(\w)/g, (s0, s1, s2) => {
      return s1.toLowerCase() + s2
    })
    return str.replace(/\w([A-Z])\w/g, (s0, s1, s2) => {
      return s1.toLowerCase() + '-' + s2
    })
  }

}

export default utils
