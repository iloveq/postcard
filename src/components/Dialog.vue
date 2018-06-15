<template>
  <div class="dialog">
    <!-- 遮罩 -->
    <div class="dialog-cover back" v-if="isShow" @click="closeMyself"></div>
    <!-- props 控制内容的样式  -->
    <div class="dialog-content" :style="{top:topDistance+'%',width:widNum+'%',left:leftSite+'%'}" v-if="isShow">
      <div class="dialog_head back ">
        <slot name="header">header</slot>
      </div>
      <div class="dialog_main " :style="{paddingTop:pdt+'px',paddingBottom:pdb+'px'}">
        <slot name="main">body</slot>
      </div>
      <!-- 弹窗关闭按钮 -->
      <div class="foot_close " @click="closeMyself">
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  name: "dialogComponent",
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    widNum: {
      type: Number,
      default: 86.5
    },
    leftSite: {
      type: Number,
      default: 6.5
    },
    topDistance: {
      type: Number,
      default: 18
    },
    pdt: {
      type: Number,
      default: 30
    },
    pdb: {
      type: Number,
      default: 30
    }
  },
  methods: {
    closeMyself() {
      this.$emit("on-close");
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog {
  position: relative;
  color: #2e2c2d;
  font-size: 16px;
}
// 遮罩
.dialog-cover {
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
// 内容
.dialog-content {
  position: fixed;
  top: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 300;
  .dialog_head {
    background: #409eff;
    width: 600px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .dialog_main {
    background: #ffffff;
    width: 600px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .foot_close {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #409eff;
    margin-top: -25px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("../assets/dialog_close.svg");
  }
}
</style>