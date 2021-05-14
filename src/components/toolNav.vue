<template>
  <div>
    <div class="toolnav">
      <el-button>撤销</el-button>
      <el-button>重做</el-button>
      <el-button>插入图片</el-button>
      <el-button>预览</el-button>
      <el-button>保存</el-button>
      <el-button>清空画布</el-button>
      <el-button>组合</el-button>
      <el-button>拆分</el-button>
      <el-button>锁定</el-button>
      <el-button>解锁</el-button>
      <!-- 画布的配置 -->
      <div class="canvas-config">
        <span>画布大小</span>
        <input />
        <i>*</i>
        <input />
      </div>
      <div class="canvas-config">
        <span>画布比例</span>
        <input />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toolNave',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.toolnav {
  height: 70px;
  line-height: 70px;
  text-align: left;
  margin-left: 20px;
  .canvas-config {
    display: inline-block;
    margin: 0 20px;
    span {
      margin: 10px;
    }
    i {
      padding: 0 10px;
      margin-top: 30px;
      font-style: normal;
    }
    input {
      outline: none;
    }
  }
}
</style>
