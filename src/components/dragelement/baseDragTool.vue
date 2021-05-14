<template>
  <div class="baseDraTool">
    <div @dragstart="handleDragStart" v-for="(item,index) in dragList" :key="index" draggable :data-index="index">
      <!-- <span  class="iconstyle" :class="'el-icon-'+item.icon"></span> -->
     <button>{{item.label}}</button>
    </div>
  </div>
</template>

<script>
import dragList from '@/component-list/dragList'
export default {
  name: '',
  data () {
    return {
      dragList
    }
  },
  methods: {
    handleDragStart (e) {
      console.log(111)
      e.dataTransfer.setData('index', e.target.dataset.index)
    }
  }
}
</script>

<style lang="scss" scoped>
 .baseDraTool{

    display:flex;
     flex-direction: column;
     flex-wrap: nowrap;
     button{

    margin: 10px;
     }

 }

</style>
