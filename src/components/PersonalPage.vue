<template>
  <div id="personal">
    <h3>{{title}}</h3>
    <img-upload v-on:select-complete="secelted"></img-upload>
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
import upload from "../components/upload-img.vue";
import Api from "../data/api.js";
import { isEmpty } from "../utils.js";
import { upload_form } from "../data/localData.js";
export default {
  data: function() {
    return {
      title: "我的主页",
      show_snap: false,
      type: "success",
      snap_text: "欢迎来到微笑明信片，让我们一起分享快乐吧 φ(゜▽゜*)♪",
      upload_form
    };
  },
  components: {
    "img-upload": upload
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
    secelted(data) {
      console.log(data);
      this.upload_form.data = data;
      this.upload_form.name = "111";
      this.upload_form.content = "我们";
      this.upload();
    },
    upload: function() {
      let that = this;
      if (
        !isEmpty(this.upload_form.name) &&
        !isEmpty(this.upload_form.content) &&
        !isEmpty(this.upload_form.data)
      ) {
        let formData = new window.FormData();
        formData.append("image", this.upload_form.data, ".jpg");
        formData.append("name", this.upload_form.name);
        formData.append("content", this.upload_form.content);
        this.$http.post(Api.UPLOAD, formData).then(
          response => {
            if (response.ok && response.body.code == "201") {
              that.showSnap("success", response.body.message);
            } else {
              that.showSnap("error", "上传失败");
            }
          },
          () => {
            that.showSnap("error", "上传失败");
          }
        );
      } else {
        that.showSnap("error", "请保证您的明信片完整");
      }
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

#snap {
  left: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
}
</style>