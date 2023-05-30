<template>
  <div class="baseDraTool">
    <draggable
    class="list-group" :list="dragList" :group="{ name: 'widget', pull: 'clone', put: false }" :sort="false" :clone="handleClone" @change="log"
    >
    <div  v-for="(item, index) in dragList"
      :key="index">
      <button>{{ item.title }}</button>

    </div>
    </draggable>
  </div>
</template>

<script>
import { dragList } from '@/component-list/dragList'
let idGlobal = 0

class Payload {
  constructor () {
    this.notes = '名称'
    this.key = 'key' + new Date().getTime()
    this.type = 'varchar'
    this.isWrite = '0'
    this.isRead = '0'
  }
}
export default {
  name: '',
  data () {
    return {
      active: 'WidgetText',
      dragList
    }
  },
  methods: {
    log (evt) {
      // console.log(evt)
    },
    handleClone ({ title, type, payload }) {
      const obj = {
        title,
        type,
        payload: Object.assign(new Payload(), payload),
        id: idGlobal++
      }
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
.baseDraTool {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  button {
    margin: 10px;
  }
}
</style>
