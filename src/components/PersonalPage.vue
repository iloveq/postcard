<template>
  <div id="personal">
    <h3>{{title}}</h3>
  </div>
</template>

<script>
export default {

  data: function() {
    return {
      title: '我的主页'
    }
  }
}
</script>


<style lang="css">
#personal {
  background-color: white;
  font: '微软雅黑';
  color: #409eff;
  padding: 10px;
  text-align: center;
}
</style>