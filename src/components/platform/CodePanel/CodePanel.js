import './codePanel.less'
import CodeMirror from 'codemirror'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
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
  watch: {
    value (val) {
      if (!this.editor) {
        this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
          lineNumbers: true,
          mode: 'htmlmixed',
          theme: 'eclipse',
          tabSize: 2
        })
        this.editor.on('change', this.handleChange)
      }
      val !== this.editor.getValue() && this.editor.setValue(val)
    }
  },

  methods: {
    handleChange () {
      // this.$emit('change', this.editor.getValue())
    }
  }
}
