<template>
  <div id="personal">
    <h3>{{title}}</h3>
    <img-upload v-on:select-complete="secelted"></img-upload>
  </div>
</template>

<script>
import upload from "../components/upload-img.vue";
export default {
  data: function() {
    return {
      title: "我的主页"
    };
  },
  components: {
    "img-upload": upload
  },
  methods: {
    //选择图片后返回的数据
    secelted(data) {
      console.log(data);
    }
  }
};
</script>


<style lang="css">
#personal {
  background-color: white;
  font: "微软雅黑";
  color: #409eff;
  padding: 10px;
  text-align: center;
}
</style>