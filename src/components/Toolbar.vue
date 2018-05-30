<template>
  <div id="toolbar" >
    <h3>{{title}}</h3>
    <h5>{{desc}}</h5>
  </div>
</template>

<script>
export default {
  
  data: function() {
    return {
      title: '微笑明信片  ：)',
      desc: '书不成字，纸短情长 一生只够爱一个人'
    }
  },
  methods: {
  
  }
}
</script>


<style lang="css">
#toolbar {
  background-color: white;
  font: '微软雅黑';
  color: #409eff;
  padding: 10px;
  text-align: center;
}
</style>
