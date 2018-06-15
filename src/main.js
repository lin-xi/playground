import Vue from 'vue'
import App from './pages/App/App'

window.eventHub = new Vue()
const app = new Vue({
  render (h) {
    return (<App />)
  },
  el: '#app'
})
