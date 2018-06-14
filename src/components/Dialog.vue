<template>
  <div class="dialog">
    <!-- 遮罩 -->
    <div class="dialog-cover back" v-if="isShow" @click="closeMyself"></div>
    <!-- 动画效果 -->
    <transition name="drop">
      <!-- props 控制内容的样式  -->
      <div class="dialog-content" :style="{top:topDistance+'%',width:widNum+'%',left:leftSite+'%'}" v-if="isShow">
        <div class="dialog_head back ">
          <slot name="header">提示信息</slot>
        </div>
        <div class="dialog_main " :style="{paddingTop:pdt+'px',paddingBottom:pdb+'px'}">
          <slot name="main">弹窗内容</slot>
        </div>
        <!-- 弹窗关闭按钮 -->
        <div class="foot_close " @click="closeMyself">
        </div>
      </div>
    </transition>
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
.drop-enter-active {
  animation: In 0.5s linear;
}
.drop-leave-active {
  animation: Out 0.5s linear;
}

@keyframes In {
  0% {
    transform: matrix(0.1, 0, 0, 0.1, 780, 780); ;
  }
 
}

@keyframes Out {
 
  100% {
    transform: matrix(0.1, 0, 0, 0.1, 780, 780); ;
  }
}

// 最外层 设置position定位
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