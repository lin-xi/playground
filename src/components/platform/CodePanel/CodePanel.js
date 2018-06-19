import './codePanel.less'
import CodeMirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'

export default {
  name: 'w-codePanel',
  props: {
    value: {
      type: String
    }
  },
  render (h) {
    return <div class='code-panel'>
      <textarea ref='textarea'>{this.value}</textarea>
    </div>
  },

  mounted () {
    this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'htmlmixed',
      theme: 'eclipse',
      tabSize: 2
    })
    this.editor.on('change', this.handleChange)
  },

  watch: {
    value (val) {
      console.log('watch change', val)
      val !== this.editor.getValue() && this.editor.setValue(val)
    }
  },

  methods: {
    handleChange () {
      // this.$emit('change', this.editor.getValue())
    }
  }
}
