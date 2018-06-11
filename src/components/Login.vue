<template>
  <div id="home">
    <!-- 头部 -->
    <toolbar></toolbar>
    <!-- 内容 -->
    <!-- 登陆 注册 -->
    <div id="user_info_area">
      <el-input id="input_name" placeholder="昵称/手机号" suffix-icon="el-icon-mobile-phone" v-model="input_name">
      </el-input>
      <el-input id="input_pwd" placeholder="密码" suffix-icon="el-icon-view" v-model="input_pwd">
      </el-input>
      <h6 style="margin-left:10px;">内个，我们写一张明信片吧！</h6>
      <el-button class="user_action" @click="clickButton" type="primary">{{user_action}}</el-button>
      <div class="user_action_ctrl">
        已有帐号？
        <span @click="switchUserAction">{{user_action_ctrl}}</span>
      </div>
    </div>
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
import { isEmpty, getStore } from "../utils.js";
import { mapState, mapMutations } from "vuex";
import {
  login_form,
  register_form,
} from "../data/localData.js";
import Api from "../data/api.js";
export default {
  name: "HomePage",
  components: {
    toolbar: require("../components/Toolbar.vue").default
  },
  data: function() {
    return {
      default_user_img: "./static/imgs/avatar.jpg",
      show_snap: true,
      type: "success",
      snap_text: "欢迎来到微笑明信片，让我们一起分享快乐吧 φ(゜▽゜*)♪",
      user_action: "注册",
      user_action_ctrl: "登陆",
      input_name: "",
      input_pwd: "",
      register_form,
      login_form
    };
  },
  computed: {
    ...mapState({
      isLogin: "isLogin",
      username: "username",
      token: "token"
    })
  },
  methods: {
    ...mapMutations(["RECORD_USERINFO"]),
    switchUserAction: function() {
      this.user_action = this.user_action_ctrl == "登陆" ? "登陆" : "注册";
      this.user_action_ctrl = this.user_action_ctrl == "登陆" ? "注册" : "登陆";
    },

    showSnap: function(type, text) {
      this.show_snap = true;
      this.type = type;
      this.snap_text = text;
      window.setTimeout(() => {
        this.show_snap = false;
      }, 800);
    },
    clickButton: function() {
      if (this.user_action == "登陆") {
        this.login();
      } else {
        this.register();
      }
    },
    register: function() {
      var that = this;
      this.register_form.name = this.input_name;
      this.register_form.password = this.input_pwd;
      if (isEmpty(this.input_name) || isEmpty(this.input_pwd)) {
        that.showSnap("error", "输入格式错误");
      } else {
        this.$http.post(Api.REGISTER, this.register_form).then(
          response => {
            if (response.ok) {
              if (
                !isEmpty(response.body.data.name) &&
                !isEmpty(response.body.data.password)
              ) {
                if (response.body.code == "201") {
                  that.showSnap("warning", response.body.message);
                } else {
                  that.showSnap("success", response.body.message);
                  //TODO:登陆
                  that.login_form.name = response.body.data.name;
                  that.login_form.password = response.body.data.password;
                  that.login_form.token = response.body.data.token;
                  that.login();
                }
              } else {
                that.showSnap("success", "响应格式错误");
              }
            }
          },
          () => {
            that.showSnap("error", "注册失败，请检查网络连接");
          }
        );
      }
    },

    goHome: function() {
      console.log(this);
      this.$router.push({ path: "/home" });
    },

    login: function() {
      var that = this;
      this.login_form.name = this.input_name;
      this.login_form.password = this.input_pwd;
      this.login_form.token = this.token;
      if (isEmpty(this.input_name) || isEmpty(this.input_pwd)) {
        that.showSnap("error", "输入格式错误");
        console.log("112");
      } else {
        this.$http.post(Api.LOGIN, this.login_form).then(
          response => {
            if (response.ok) {
              if (!isEmpty(response.body.data.token)) {
                that.showSnap("success", response.body.message);
                //存储token
                this.RECORD_USERINFO({
                  username: response.body.data.username,
                  token: response.body.data.token,
                  isLogin: true,
                  imgArr: response.body.data.imgArr
                });
                that.goHome();
                console.log(getStore("token"));
              } else {
                that.showSnap("error", response.body.message);
              }
            } else {
              that.showSnap("error", "登陆失败");
            }
          },
          () => {
            that.showSnap("error", "登陆失败");
          }
        );
      }
    }
  },
};
</script>

<style>
#home {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
    sans-serif;
  font-size: 15px;
  color: #1a1a1a;
  background: white;
  -webkit-tap-highlight-color: rgba(26, 26, 26, 0);
  margin-top: 20px;
}
#input_name {
  margin-top: 2px;
}

#input_pwd {
  margin-top: 8px;
}

.user_action {
  display: inline-block;
  text-align: center;
  width: 100%;
}

.title {
  font-size: 22px;
}

.content-h4 {
  display: block;
  font-size: 1.17em;
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  font-weight: bold;
}

.user_action_ctrl {
  margin-top: 8px;
  float: right;
  font-size: 14px;
}

.user_action_ctrl span {
  color: #409eff;
  cursor: pointer;
}

#user_info_area {
  z-index: 10;
  transform: translateZ(0px);
  width: 340px;
  margin-left: 30px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
}



#snap {
  left: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
}



</style>
