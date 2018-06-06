<template>
  <div id="home">
    <!-- 头部 -->
    <toolbar></toolbar>
    <!-- 内容 -->
    <!-- 登陆 注册 -->
    <div id="user_info_area" v-show="!isLogin">
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
    <!-- 用户专栏 -->
    <div id="user_info" v-show="isLogin">
      <!-- 帽子 -->
      <div class="hat"></div>
      <!-- 头 -->
      <div class="header">
        <!-- 头像 -->
        <div class="head-avatar">
          <img style="width:90px;" :src="default_user_img" @click="goPersonalPage">
        </div>
        <!-- 昵称 -->
        <div class="head-name">
          <span style="font-size:16px;font-weight:900;color:#444;margin-right:10px;">{{username!=""?username:"微笑"}}</span>
        </div>
        <!-- 个人简介 -->
        <div class="head-desc">
          <span style="margin-left:10px;height:60px;width:360px;font-size:13px;font-weight:500;color:#444;display:inline-block;">这个人很懒 ~ 暂无简介</span>
        </div>
        <!-- 编辑信息 -->
        <i id="edit-mine-info" class="el-icon-edit"></i>
      </div>
      <!-- 尾巴 -->
      <div class="tail-nav">
        <div class="nav-item" v-for="(item,index) in items" :key="index">
          <a :href="item.href" class="Item" role="tab" :title="item.name">
            {{item.name}}
          </a>
          <div class="Counter">
            {{item.count}}
          </div>
        </div>
      </div>
    </div>
    <!-- 优秀作品推荐 -->
    <div id="card-list">
      <div class="card-item" v-for="(item,index) in cards" :key="index">
        <img class="card-item-img" :src="item.imgurl">
        <div class="card-item-userinfo">
          {{item.name}} {{item.like}}
        </div>
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
      register_form: {
        name: "",
        age: "",
        sex: "",
        address: "",
        imgArr: "",
        phone: "",
        password: "",
        token: ""
      },
      login_form: {
        name: "",
        password: "",
        token: ""
      },
      items: [
        {
          href: "",
          name: "粉丝",
          count: 0
        },
        {
          href: "",
          name: "关注",
          count: 0
        },
        {
          href: "",
          name: "获赞",
          count: 0
        }
      ],
      cards: [
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frv032vod8j30k80q6gsz.jpg",
          name: "︶ㄣ期待想念、、",
          like: 1,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1fs02a9b0nvj30sg10vk4z.jpg",
          name: "心诏不宣@",
          like: 2,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1fryyn63fm1j30sg0yagt2.jpg",
          name: "殇不起",
          like: 3,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frv03m8ky5j30iz0rltfp.jpg",
          name: " 小熊_,",
          like: 4,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frsllc19gfj30k80tfah5.jpg",
          name: "一别便不再见",
          like: 5,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frslibvijrj30k80q678q.jpg",
          name: "看看我的坏",
          like: 6,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frrifts8l5j30j60ojq6u.jpg",
          name: "〞将军っ",
          like: 7,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frqscr5o00j30k80qzafc.jpg",
          name: "伤上三五年",
          like: 8,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frmuto5qlzj30ia0notd8.jpg",
          name: "Super丿潮流盛典",
          like: 9,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frjd77dt8zj30k80q2aga.jpg",
          name: "-离沐倾城 winnie°",
          like: 10,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frjd4var2bj30k80q0dlf.jpg",
          name: "-离沐倾城 winnie°",
          like: 11,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frja502w5xj30k80od410.jpg",
          name: "-离沐倾城 winnie°",
          like: 12,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frepr2rhxvj30qo0yjth8.jpg",
          name: "-离沐倾城 winnie°",
          like: 13,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frepqtwifwj30no0ti47n.jpg",
          name: "-离沐倾城 winnie°",
          like: 14,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frepq6mfvdj30p00wcwmq.jpg",
          name: "-离沐倾城 winnie°",
          like: 15,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frepozc5taj30qp0yg7aq.jpg",
          name: "-离沐倾城 winnie°",
          like: 16,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frevscw2wej30je0ps78h.jpg",
          name: "-离沐倾城 winnie°",
          like: 17,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1frg40vozfnj30ku0qwq7s.jpg",
          name: "-离沐倾城 winnie°",
          like: 18,
          share: 2,
          collect: 3
        },
        {
          cardId: "",
          imgurl:
            "http://ww1.sinaimg.cn/large/0065oQSqly1fri9zqwzkoj30ql0w3jy0.jpg",
          name: "-离沐倾城 winnie°",
          like: 19,
          share: 2,
          collect: 3
        }
      ]
    };
  },
  computed: mapState({
    isLogin: "isLogin",
    username: "username"
  }),
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
        console.log("111");
      } else {
        this.$http
          .post("http://localhost:3001/api/register", this.register_form)
          .then(
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

    goPersonalPage: function() {
      console.log(this);
      this.$router.push({ path: "/personal" });
    },

    login: function() {
      var that = this;
      this.login_form.name = this.input_name;
      this.login_form.password = this.input_pwd;
      // token 从 vuex 获取
      this.login_form.token = "";
      if (isEmpty(this.input_name) || isEmpty(this.input_pwd)) {
        that.showSnap("error", "输入格式错误");
        console.log("112");
      } else {
        this.$http
          .post("http://localhost:3001/api/login", this.login_form)
          .then(
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
  }
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

#user_info {
  width: 800px;
  background: #fff;
  margin-top: 30px;
  position: relative;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  margin-left: auto;
  margin-right: auto;
}

.hat {
  width: 100px;
  height: 100px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 15px;
  top: -40px;
}

.header {
  height: 100px;
  background: #fff;
  position: relative;
  padding-left: 130px;
  margin-right: 236px;
  border-right: 1px solid #ededed;
}

.head-avatar {
  background: #fff;
  border-radius: 4px;
  position: absolute;
  left: 20px;
  top: -35px;
  width: 90px;
}

.head-name {
  background: #fff;
  border-radius: 4px;
  position: absolute;
  left: 20px;
  top: 65px;
  width: 100px;
  text-align: center;
}

.head-desc {
  height: 100px;
  line-height: 1;
  position: relative;
  display: table-cell;
  vertical-align: middle;
}

#edit-mine-info {
  margin-bottom: 20px;
  margin-right: 20px;
  position: absolute;
  right: 0;
  bottom: 0;
}

.tail-nav {
  width: 236px;
  height: 100px;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  display: flex;
}

.nav-item {
  flex: 1;
  display: block;
  text-align: center;
}

.Item {
  text-decoration: none;
  font-size: 14px;
  color: #586069;
  line-height: 1;
  text-align: center;
  border-bottom: 2px solid transparent;
}

.Counter {
  line-height: 1;
  padding: 2px 5px;
  font-size: 12px;
  font-weight: 600;
  color: #586069;
}

#card-list {
  width: 900px;
  background: #fff;
  margin-top: 300px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
}

#card-list:after {
  content: "";
  flex-grow: 999999999;
}

.card-item {
  flex-grow: 1;
  margin: 2px;
  position: relative;
  align-items: center;
}

.card-item-img {
  height: 200px;
  object-fit: cover;
  min-width: 100%;
  /* vertical-align: bottom; */
}

.card-item-userinfo {
  background: white;
  font-size: 12px;
  font-weight: 600;
  color: #409eff;
  text-align: center;
  padding: 10px;
}

#snap {
  left: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
}
</style>
