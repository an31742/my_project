// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1
}

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false // 是否锁定组件
}

export const dragList = [
  {
    title: '标签',
    type: 'widget-text',
    payload: {
      name: '',
      notes: '标签',
      text: 'text',
      level: 'h3',
      isBlock: '1'
    }
  },
  {
    title: '输入框',
    type: 'widget-input',
    payload: {
      name: 'widget-input',
      inputType: 'text',
      rule: '',
      defaultValueRadio: 'none',
      defaultValue: '',
      orderFilter: '0',
      listShow: '0'
    }
  },
  {
    title: '单选框',
    type: 'widget-radio',
    payload: {
      name: 'widget-radio',
      acount: 2,
      defaultValue: '',
      orderFilter: '0',
      listShow: '0',
      list: [{ name: '选项名称1' }, { name: '选项名称2' }]
    }
  },
  {
    title: '下拉框',
    type: 'widget-select',
    payload: {
      name: 'widget-select',
      acount: 2,
      defaultValue: '',
      orderFilter: '0',
      listShow: '0',
      isAssociateForm: '0',
      list: [{ name: '选项名称1' }, { name: '选项名称2' }]
    }
  }
]
