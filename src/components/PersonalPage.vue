<template>
  <div id="personal">
    <h3>{{title}}</h3>
    <!-- 浏览器底部toast -->
    <div id="snap" v-show="show_snap">
      <el-alert v-if="type === 'success'" :title="snap_text" type="success" center>
      </el-alert>
      <el-alert v-else-if="type === 'info'" :title="snap_text" type="info" center>
      </el-alert>
      <el-alert v-else-if="type === 'warning'" :title="snap_text" type="warning" center>
      </el-alert>
      <el-alert v-else-if="type === 'error'" :title="snap_text" type="error" center>
      </el-alert>
    </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      title: "我的主页",
      show_snap: false,
      type: "success",
      snap_text: "欢迎来到微笑明信片，让我们一起分享快乐吧 φ(゜▽゜*)♪",
    };
  },
  methods: {
    showSnap: function(type, text) {
      this.show_snap = true;
      this.type = type;
      this.snap_text = text;
      window.setTimeout(() => {
        this.show_snap = false;
      }, 800);
    },
    
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

#snap {
  left: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
}
</style>