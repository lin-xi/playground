module.exports = {
  name: 'ELEMENT',
  url: 'https://unpkg.com/element-ui/lib/index.js',
  style: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
  components: [
    {
      name: 'Button',
      title: '按钮',
      image: '',
      property: [
        {
          name: 'size',
          title: '尺寸',
          type: 'enum',
          values: [
            {label: '中', value: 'medium'},
            {label: '小', value: 'small'},
            {label: '迷你', value: 'mini'},
          ]
        },
        {
          name: 'type',
          title: '类型',
          type: 'enum',
          values: [
            {label: 'primary', value: 'primary'},
            {label: 'success', value: 'success'},
            {label: 'warning', value: 'warning'},
            {label: 'danger', value: 'danger'},
            {label: 'info', value: 'info'},
            {label: 'text', value: 'text'}
          ]
        },
        {
          name: 'plain',
          title: '是否朴素按钮',
          type: 'switch'
        },
        {
          name: 'round',
          title: '是否圆角按钮',
          type: 'switch'
        },
        {
          name: 'circle',
          title: '是否圆形按钮',
          type: 'switch'
        },
        {
          name: 'loading',
          title: '是否加载中状态',
          type: 'switch'
        },
        {
          name: 'disabled',
          title: '是否禁用状态',
          type: 'switch'
        },
        {
          name: 'icon',
          title: '图标类名',
          type: 'switch'
        },
        {
          name: 'autofocus',
          title: '是否默认聚焦',
          type: 'switch'
        },
        {
          name: 'native-type',
          title: '原生 type 属性',
          type: 'enum',
          values: [
            {label: '按钮', value: 'button'},
            {label: '提交', value: 'submit'},
            {label: '重置', value: 'reset'},
          ]
        }
      ]
    },
    {
      name: 'Radio',
      title: '单选',
      image: '',
      property: [
        {
          name: 'label',
          title: '值',
          type: 'text'
        },
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'border',
          title: '是否显示边框',
          type: 'switch'
        },
        {
          name: 'size',
          title: '尺寸',
          type: 'enum',
          values: [
            {label: '中', value: 'medium'},
            {label: '小', value: 'small'},
            {label: '迷你', value: 'mini'},
          ]
        },
        {
          name: 'name',
          title: '原生name属性',
          type: 'text'
        }
      ]
    },
    {
      name: 'Checkbox',
      title: '多选',
      image: '',
      property: [
        {
          name: 'label',
          title: '值',
          type: 'text'
        },
        {
          name: 'true-label',
          title: '选中时的值',
          type: 'text'
        },
        {
          name: 'false-label',
          title: '没有选中时的值',
          type: 'text'
        },
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'border',
          title: '是否显示边框',
          type: 'switch'
        },
        {
          name: 'size',
          title: '尺寸',
          type: 'enum',
          values: [
            {label: '中', value: 'medium'},
            {label: '小', value: 'small'},
            {label: '迷你', value: 'mini'},
          ]
        },
        {
          name: 'name',
          title: '原生name属性',
          type: 'text'
        },
        {
          name: 'checked',
          title: '当前是否勾选',
          type: 'switch'
        },
        {
          name: 'indeterminate',
          title: ' indeterminate 状态',
          type: 'switch'
        }
      ]
    },
    {
      name: 'Input',
      title: '输入框',
      image: '',
      property: [
        {
          name: 'type',
          title: '类型',
          type: 'enum',
          values: [
            {label: '文本框', value: 'text'},
            {label: '多行文本框', value: 'textarea'},
            {label: '密码', value: 'password'},
            {label: '数字', value: 'number'},
            {label: '验证码', value: 'varycode'}
          ]
        },
        {
          name: 'value',
          title: '值',
          type: 'text'
        },
        {
          name: 'maxlength',
          title: '最大输入长度',
          type: 'number'
        },
        {
          name: 'minlength',
          title: '最小输入长度',
          type: 'number'
        },
        {
          name: 'placeholder',
          title: '占位文本',
          type: 'text'
        },
        {
          name: 'clearable',
          title: '是否可清空',
          type: 'switch'
        },
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'size',
          title: '尺寸',
          type: 'enum',
          values: [
            {label: '中', value: 'medium'},
            {label: '小', value: 'small'},
            {label: '迷你', value: 'mini'},
          ]
        },
        {
          name: 'prefix-icon',
          title: '输入框头部图标',
          type: 'text'
        },
        {
          name: 'suffix-icon',
          title: '输入框尾部图标',
          type: 'text'
        },
        {
          name: 'rows',
          title: '行数',
          type: 'number'
        },
        {
          name: 'autosize',
          title: '自适应内容高度',
          type: 'switch'
        },
        {
          name: 'auto-complete',
          title: '自动补全',
          type: 'enum',
          values: [
            {label: '开', value: 'on'},
            {label: '关', value: 'off'}
          ]
        },
        {
          name: 'name',
          title: '原生属性',
          type: 'text'
        },
        {
          name: 'readonly',
          title: '只读',
          type: 'switch'
        },
        {
          name: 'min',
          title: '最小值',
          type: 'number'
        },
        {
          name: 'max',
          title: '最大值',
          type: 'number'
        },
        {
          name: 'step',
          title: '最大值',
          type: 'number'
        },
        {
          name: 'resize',
          title: '是否缩放',
          type: 'enum',
          values: [
            {label: 'none', value: 'none'},
            {label: 'both', value: 'both'},
            {label: 'horizontal', value: 'horizontal'},
            {label: 'vertical', value: 'vertical'}
          ]
        },
        {
          name: 'autofocus',
          title: '自动获取焦点',
          type: 'switch'
        },
        {
          name: 'form',
          title: '原生属性',
          type: 'text'
        },
        {
          name: 'label',
          title: '关联的label文字',
          type: 'text'
        },
        {
          name: 'tabindex',
          title: 'tabindex',
          type: 'text'
        }
      ]
    },
    {
      name: 'InputNumber',
      title: '计数器',
      image: '',
      property: [
        {
          name: 'value',
          title: '值',
          type: 'text'
        },
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'size',
          title: '尺寸',
          type: 'enum',
          values: [
            {label: '大', value: 'large'},
            {label: '小', value: 'small'}
          ]
        },
        {
          name: 'precision',
          title: '数值精度',
          type: 'number'
        },
        {
          name: 'controls',
          title: '是否使用控制按钮',
          type: 'switch'
        },
        {
          name: 'controls-position',
          title: '控制按钮位置',
          type: 'enum',
          values: [
            {label: '又', value: 'right'}
          ]
        },
        {
          name: 'name',
          title: '原生属性',
          type: 'text'
        },
        {
          name: 'label',
          title: '输入框关联的label文字',
          type: 'text'
        }
      ]
    },
    {
      name: 'Select',
      title: '选择器',
      image: '',
      property: [
        {
          name: 'multiple',
          title: '是否多选',
          type: 'switch'
        },
        {
          name: 'disabled',
          title: '是否禁用',
          type: 'switch'
        },
        {
          name: 'value-key',
          title: '键名',
          type: 'text'
        },
        {
          name: 'size',
          title: '尺寸',
          type: 'enum',
          values: [
            {label: '中', value: 'medium'},
            {label: '小', value: 'small'},
            {label: '迷你', value: 'mini'},
          ]
        },
        {
          name: 'clearable',
          title: '是否可以清空',
          type: 'switch'
        },
        {
          name: 'placeholder',
          title: '占位文本',
          type: 'text'
        },
        {
          name: 'clearable',
          title: '是否可清空',
          type: 'switch'
        },
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'prefix-icon',
          title: '输入框头部图标',
          type: 'text'
        },
        {
          name: 'suffix-icon',
          title: '输入框尾部图标',
          type: 'text'
        },
        {
          name: 'rows',
          title: '行数',
          type: 'number'
        },
        {
          name: 'autosize',
          title: '自适应内容高度',
          type: 'switch'
        },
        {
          name: 'auto-complete',
          title: '自动补全',
          type: 'enum',
          values: [
            {label: '开', value: 'on'},
            {label: '关', value: 'off'}
          ]
        },
        {
          name: 'name',
          title: '原生属性',
          type: 'text'
        },
        {
          name: 'readonly',
          title: '只读',
          type: 'switch'
        },
        {
          name: 'min',
          title: '最小值',
          type: 'number'
        },
        {
          name: 'max',
          title: '最大值',
          type: 'number'
        },
        {
          name: 'step',
          title: '最大值',
          type: 'number'
        },
        {
          name: 'resize',
          title: '是否缩放',
          type: 'enum',
          values: [
            {label: 'none', value: 'none'},
            {label: 'both', value: 'both'},
            {label: 'horizontal', value: 'horizontal'},
            {label: 'vertical', value: 'vertical'}
          ]
        },
        {
          name: 'autofocus',
          title: '自动获取焦点',
          type: 'switch'
        },
        {
          name: 'form',
          title: '原生属性',
          type: 'text'
        },
        {
          name: 'label',
          title: '关联的label文字',
          type: 'text'
        },
        {
          name: 'tabindex',
          title: 'tabindex',
          type: 'text'
        }
      ]
    },
    {
      name: 'Switch',
      title: '开关',
      image: '',
      property: [
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'width',
          title: '宽度',
          type: 'number'
        },
        {
          name: 'active-text',
          title: '打开时的文字描述',
          type: 'text'
        },
        {
          name: 'inactive-text',
          title: '关闭时的文字描述',
          type: 'text'
        },
        {
          name: 'active-value',
          title: '打开时的值',
          type: 'text'
        },
        {
          name: 'inactive-value',
          title: '关闭时的值',
          type: 'text'
        },
        {
          name: 'active-color',
          title: '打开时的背景色',
          type: 'text'
        },
        {
          name: 'inactive-color',
          title: '关闭时的背景色',
          type: 'text'
        },
        {
          name: 'name',
          title: '对应的 name 属性',
          type: 'text'
        }
      ]
    },
    {
      name: 'Slider',
      title: '滑块',
      image: '',
      property: [
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'min',
          title: '最小值',
          type: 'number'
        },
        {
          name: 'max',
          title: '最大值',
          type: 'number'
        },
        {
          name: 'step',
          title: '步长',
          type: 'number'
        },
        {
          name: 'show-input',
          title: '是否显示输入框',
          type: 'switch'
        },
        {
          name: 'show-input-controls',
          title: '显示输入框的控制按钮',
          type: 'switch'
        },
        {
          name: 'input-size',
          title: '输入框的尺寸',
          type: 'text'
        },
        {
          name: 'show-stops',
          title: '是否显示间断点',
          type: 'switch'
        },
        {
          name: 'show-tooltip',
          title: '是否显示 tooltip',
          type: 'switch'
        },
        {
          name: 'height',
          title: '高度',
          type: 'number'
        }
      ]
    },
    {
      name: 'TimePicker',
      title: '时间选择器',
      image: '',
      property: [
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'readonly',
          title: '完全只读',
          type: 'switch'
        },
        {
          name: 'editable',
          title: '文本框可输入',
          type: 'switch'
        },
        {
          name: 'size',
          title: '输入框尺寸',
          type: 'enum',
          values: [
            {label: '中', value: 'medium'},
            {label: '小', value: 'small'},
            {label: '迷你', value: 'mini'},
          ]
        }
      ]
    },
    {
      name: 'DatePicker',
      title: '日期选择器',
      image: '',
      property: [
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'readonly',
          title: '完全只读',
          type: 'switch'
        },
        {
          name: 'editable',
          title: '文本框可输入',
          type: 'switch'
        },
        {
          name: 'size',
          title: '输入框尺寸',
          type: 'enum',
          values: [
            {label: '中', value: 'medium'},
            {label: '小', value: 'small'},
            {label: '迷你', value: 'mini'},
          ]
        }
      ]
    },
    {
      name: 'Upload',
      title: '上传',
      image: '',
      property: [
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'action',
          title: '上传的地址',
          type: 'text'
        },
        {
          name: 'name',
          title: '上传的文件字段名',
          type: 'text'
        }
      ]
    },
    {
      name: 'Rate',
      title: '评分',
      image: '',
      property: [
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'max',
          title: '最大分值',
          type: 'number'
        },
        {
          name: 'allow-half',
          title: '是否允许半选',
          type: 'switch'
        }
      ]
    },
    {
      name: 'ColorPicker',
      title: '颜色选择器',
      image: '',
      property: [
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'size',
          title: '输入框尺寸',
          type: 'enum',
          values: [
            {label: '中', value: 'medium'},
            {label: '小', value: 'small'},
            {label: '迷你', value: 'mini'},
          ]
        },
        {
          name: 'show-alpha',
          title: '是否支持透明度选择',
          type: 'switch'
        }
      ]
    },
    {
      name: 'Tag',
      title: '标签',
      image: '',
      property: [
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        },
        {
          name: 'type',
          title: '主题',
          type: 'enum',
          values: [
            {label: '成功', value: 'success'},
            {label: '提示', value: 'info'},
            {label: '警告', value: 'warning'},
            {label: '错误', value: 'danger'}
          ]
        },
        {
          name: 'hit',
          title: '是否有边框描边',
          type: 'switch'
        }
      ]
    }
  ]
}
