<template>
  <div class="raw-displayer">
    <div class="main">
      <pre>{{ valueString }}</pre>
    </div>
  </div>
</template>
<script>
const props = {
  name: 'raw-displayer',
  title: {
    required: true,
    type: String
  },
  value: {
    required: true
  }
}
export default {
  props,
  computed: {
    valueString () {
      return JSON.stringify(this.value, null, 2)
    }
  }
}
</script>
<style lang="scss" scoped>
.raw-displayer {
  // margin-left:200px;
  border: 1px solid #222;
  height: 500px;
  overflow: auto;
  font-size: 20px;
  background: #ccc;
}
.main {
  display: flex;
  color: #222;
    pre {
      flex:1;
      text-align: start;
    }
}
</style>
