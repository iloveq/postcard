<template>
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
</template>

<script>
export default {
  name: "snapbar",
  data: function() {
    return {
      show_snap: true,
      type: "success",
      snap_text: "欢迎来到微笑明信片，让我们一起分享快乐吧 φ(゜▽゜*)♪"
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
    }
  }
};
</script>


<style lang="css">
#snap {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
}
</style>
