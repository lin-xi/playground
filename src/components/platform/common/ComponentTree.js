const uuid = require('uuid/v4')
let uid = 0

export default class ComponentTree {
  constructor (data) {
    if (data && typeof (data) === 'object') {
      this.treeData = data
    } else {
      this.treeData = {
        cid: 0,
        title: '',
        name: 'root',
        path: '/',
        props: {},
        children: []
      }
    }
  }

  setData (data) {
    this.treeData = data
  }

  addComponent (cid, item) {
    item.cid = ++uid + '-' + uuid()
    if (cid == 0) {
      this.treeData.children.push(item)
    } else {
      let node = this.find(cid)
      if (node) {
        node.children.push(item)
      }
    }
  }

  insertComponent (cid, item) {
    let stack = [], parent = this.treeData, index = 0
    let done = false
    for (var i = 0; i < parent.children.length; i++) {
      let currentParent = parent
      let child = parent.children[i]
      stack.push(child)
      while (stack.length > 0) {
        let node = stack.pop()
        if (node.cid == cid) {
          let idx = currentParent.children.indexOf(node)
          currentParent.children.splice(idx, 0, item)
          done = true
          break
        } else {
          if (node.children.length > 0) {
            currentParent = node
            for (var j = 0; j < node.children.length; j++) {
              stack.unshift(node.children[j])
            }
          }
        }
      }
      if (done) break
    }
  }

  removeComponent (cid) {
    let stack = [], parent = this.treeData, index = 0
    let item
    for (var i = 0; i < parent.children.length; i++) {
      let currentParent = parent
      let child = parent.children[i]
      stack.push(child)
      while (stack.length > 0) {
        let node = stack.shift()
        if (node.cid == cid) {
          let idx = currentParent.children.indexOf(node)
          item = currentParent.children.splice(idx, 1)
          break
        } else {
          if (node.children.length > 0) {
            // stack.push(node);
            currentParent = node
            for (var j = 0; j < node.children.length; j++) {
              stack.unshift(node.children[j])
            }
          }
        }
      }
      if (item) {
        break
      }
    }
    return item
  }

  moveComponent (ocid, cid) {
    let compo = this.removeComponent(ocid)
    if (compo && compo.length > 0) {
      this.addComponent(cid, compo[0])
    }
  }

  prependComponent (cid, ocid) {
    let compo
    if (typeof (ocid) === 'object') {
      compo = ocid
      compo.cid = ++uid + '-' + uuid()
      compo && this.insertComponent(cid, compo)
    } else {
      compo = this.removeComponent(ocid)
      compo && this.insertComponent(cid, compo[0])
    }
  }

  updateProps (cid, props) {
    if (cid === 0) {
    } else {
      let node = this.find(cid)
      if (node) {
        let newProps = Object.assign(node.props, props)
        node.props = {...newProps}
      }
    }
  }

  updateChildren (cid, children) {
    if (cid === 0) {
    } else {
      let node = this.find(cid)
      if (node) {
        node.children = children
      }
    }
  }

  find (cid) {
    let item
    function recurse (data, c) {
      let match = false
      if (data.cid == cid) {
        item = data
      } else {
        if (data.children.length > 0) {
          data.children.map(node => {
            recurse(node, c)
          })
        }
      }
    }
    recurse(this.treeData, cid)
    return item
  }

  copy (cid) {
    let node = this.find(cid)
    if (node) {
      node = JSON.parse(JSON.stringify(node))
    }
    function recurse (data, c) {
      data.cid = ++uid + '-' + uuid()
      if (data.children.length > 0) {
        data.children.map(item => {
          recurse(item, c)
        })
      }
    }
    recurse(node)
    return node
  }
}
