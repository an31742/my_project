<template>
  <div>
    <toolNav></toolNav>

    <main class="home">
      <div class="drag ">
        <el-collapse accordion v-model="activeName">
          <el-collapse-item name="1">
            <template slot="title">
              构图组件
            </template>
            <div>
              <layoutDragTool />
            </div>
          </el-collapse-item>
          <el-collapse-item title="基础组件" name="2">
            <baseDragTool></baseDragTool>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="canvas ">
        <div class="pc">
          <draggable
            class="drag-area list-group"
            :list="widgetList"
            group="layout"
            @choose="handleLayoutChoose"
            @change="handleLayoutChange"
          >
            <div
              :class="[
                'list-layout-item',
                { 'is-layout-actived': activeLayoutIndex === index },
              ]"
              v-for="(item, index) in widgetList"
              :key="index"
              @click="getTableIndex(item, index)"
            >
              <p v-if="index">关联表单索引:{{ index }}</p>
              <p v-if="index === 0">主表单</p>
              <component v-bind:is="item.type" :payload="item.children">

                <!-- 控件(插槽中的内容) -->
                <!-- <template v-slot="props" v-if="item.children"> -->
                    {{item.children}}
                  <!-- <strong style="color:red">id:{{ props.data }}</strong>
                  <div v-for="(tr, trIndex) in item.children" :key="trIndex">
                    <div v-for="(td, tdIndex) in tr.rowCells" :key="tdIndex">
                      <div
                        v-if="tr.rowIndex + '|' + td.colIndex === props.data"
                        @click="getActiveIndex(tr, td, index)"
                      >

                      </div>
                    </div>
                  </div> -->
                <!-- </template> -->
              </component>
            </div>
          </draggable>
        </div>
        <rawDisplayer :value="widgetList" :title="`json`" />
      </div>
      <div class="control ">
        属性
      </div>
    </main>
  </div>
</template>
<script>
import toolNav from '@/components/toolNav.vue'
import baseDragTool from '../components/dragelement/baseDragTool'
import WidgetTable from '@/components/WidgetTable/index.vue'
// import WidgetTableConfig from '@/components/WidgetTable/config.vue'
import layoutDragTool from '@/components/dragelement/layoutDragTool'
// 业务控件
// import { cloneObjectFn } from '@/utils'
export default {
  name: 'Home',
  components: {
    toolNav,
    baseDragTool,
    layoutDragTool,
    WidgetTable
    // WidgetTableConfig
  },
  data () {
    return {
      activeName: '2',
      activeLayoutIndex: 0, // 当前选中布局控件的索引
      activeIndex: '0|0', // 当前选中控件的索引
      rowIndex: 0, // 当前选中控件的行索引(数据结构真实位置)
      colIndex: 0, // 当前选中控件的列索引(数据结构真实位置)
      widgetList: [], // pageinfo,
      subProcessList: []

    }
  },
  computed: {
    // ---------------------------------------------------布局控件
    // 当前选中布局控件的目标对象
    // activeWidgetLayoutObj () {
    //   if (!this.widgetList.length) return {}
    //   const obj = cloneObjectFn(
    //     this.widgetList[this.activeLayoutIndex] || null
    //   )
    //   return obj
    // },
    // // 当前选中布局控件的目标的payload对象
    // activeWidgetLayoutPayload () {
    //   if (!this.activeWidgetLayoutObj) return {}
    //   const obj = cloneObjectFn(this.activeWidgetLayoutObj.payload || null)
    //   return obj
    // },
    // // 当前选中布局控件的目标类型
    // activeWidgetLayoutConfigType () {
    //   if (!this.activeWidgetLayoutObj) return null
    //   return this.activeWidgetLayoutObj.type + '-config'
    // }

  },
  mounted () {
    this.finishConfig()
  },
  methods: {
    // 获取布局控件的索引
    getTableIndex (item, index) {
      this.activeLayoutIndex = index
    },

    handleLayoutChoose (cEvt) {
      this.activeLayoutIndex = cEvt.oldIndex
    },
    // // 拖拽布局控件
    handleLayoutChange (evt) {
      if (evt.moved) {
        this.activeLayoutIndex = evt.moved.newIndex
      }
      if (evt.added) {
        this.activeLayoutIndex = evt.added.newIndex
        // 再次拖拽表单的时候，需要把行列焦点重新设置，因为上个焦点的位置可能大于当前拖拽的
        this.rowIndex = 0
        this.colIndex = 0
      }
    },

    finishConfig () {}
  }
}
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

//经典三栏布局多种方法  margin float 方法不可以按照顺序摆放盒子
//--------------1第一种方法
// .drag{
//   float: left;
// width: 200px;
//   height: 100vh;
//   background: #8b8c8d;
// }
// .control{
//   float: right;
//   width: 200px;
//   height: 100vh;
//   background: #8b8c8d;
// }
// .canvas{
//   margin-left: 200px;
//   margin-right: 200px;
//   height: 100vh;
//   background-color: rgb(118, 119, 121);
// }
//------------第二种方法   postion是视图距离的绝对位置  margin需要计算视图到盒子中其他的相对位置
// .home {
//   position: relative;
// }
// .drag {
//   width: 200px;
//   height: 100vh;
//   position: absolute;
//   top: 10vh;
//   left: 0;
//   background: #8b8c8d;
// }
// .control {
//   width: 200px;
//   height: 100vh;
//   position: absolute;
//   top: 10vh;
//   right: 0;
//   background: #8b8c8d;
// }
// .canvas {
//   //只要在定位加一个左右属性就可以了
//   position: absolute;
//   top: 10vh;
//   height: 100vh;
//   right: 200px;
//   left: 200px;
//   // margin-top: 10vh;
//   background: #000;
// }
//-----------第三种方法  每一个都加了tablecell属性表格
// .home{
//   width: 100%;
//   // display: table;
// }

// .column{
// display: table-cell;
//  height: 100vh;
// }
// .drag{
//   width: 200px;
//  min-width: 200px;
//   background: #c49d9d;
// }
// .control{
//   width: 200px;
//    min-width: 200px;
//   background:#c49d9d;
// }
// .canvas{
//   width: 100%;
//   background: #7e7979;
// }
//-------------第四种方法 flex布局
.home {
  display: flex;
  justify-content: space-between;
}
.drag {
  width: 200px;
  height: 100vh;
  background: #c49d9d;
}
.control {
  width: 200px;
  height: 100vh;
  background: #c49d9d;
}
.canvas {
  height: 100vh;
  width: 100%;
  background: #7e7979;
  .pc {
    display: block;
    margin: auto;
    background: url("~@/assets/pc-box.png") no-repeat;
    background-size: cover;
    height: 700px;
    width: 100%;
    // border:1px solid red;
    padding: 50px 5px;
    display: flex;
    flex-direction: column;
    box-sizing: content-box;
    p {
      color: red;
    }
    .drag-area {
      margin: 0 auto;
      width: 1080px;
      height: 620px;
      overflow: auto;
      // flex: 1;
      .list-group-item {
        width: 100%;
      }
      .list-layout-item {
        margin-bottom: 20px;
        width: 100%;
      }
    }
  }
}
</style>
