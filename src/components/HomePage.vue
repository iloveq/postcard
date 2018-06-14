<template>
  <div id="home">
    <!-- 头部 -->
    <toolbar></toolbar>
    <!-- 用户专栏 -->
    <div id="user_info">
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
        <i id="edit-mine-info" class="el-icon-edit" @click="goPersonalPage"></i>
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
    <!-- 我的作品 -->
    <h4 v-show="works.length>0" style="width: 970px;background: #fff;margin-top: 30px;margin-left: auto;margin-right: auto;">我的作品</h4>
    <div id="card-list" v-show="works.length>0">
      <div class="card-item" v-for="(item,index) in works" :key="index">
        <img class="card-item-img" :src="item.imgurl">
        <div class="card-item-userinfo">
          {{item.name}}
        </div>
        <div class="card-item-content">
          {{item.content}}
        </div>
        <p class="card-item-operator">
          <span title="喜欢" class="like">
            <i class="like-icon"></i>{{item.like}}</span>
          <span title="分享" class="share">
            <i class="share-icon"></i>{{item.share}}</span>
        </p>
      </div>
    </div>
    <!-- 优秀作品推荐 -->
    <h4 style="width: 970px;background: #fff;margin-top: 30px;margin-left: auto;margin-right: auto;">热门推荐</h4>
    <div id="card-list">
      <div class="card-item" v-for="(item,index) in cards" :key="index">
        <img class="card-item-img" :src="item.imgurl">
        <div class="card-item-userinfo">
          {{item.name}}
        </div>
        <div class="card-item-content">
          {{item.content}}
        </div>
        <p class="card-item-operator">
          <span title="喜欢" class="like">
            <i class="like-icon"></i>{{item.like}}</span>
          <span title="分享" class="share">
            <i class="share-icon"></i>{{item.share}}</span>
        </p>
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
    <!-- 悬浮球 -->
    <div id="float-ball" @click="showUploadWorkDialog">
    </div>
    <work-dialog :is-show="isShowWorkArea" @on-close="closeDialog">
      <div class="dialog_upload_header" slot="header">
        我的明信片:D
      </div>
      <div class="dialog_upload_main" slot="main">
        <imgUpload v-on:select-complete="secelted"></imgUpload>
        <div class="work-content">
          <!-- 用户信息 -->
          <div class="work-username">
            作者：{{username}}
          </div>
          <!-- 添加文字 -->
          <div class="edit-content">
            <textarea name="text" rows="3" class="card-add-content" placeholder="这里写下你想说的话（*＾-＾*）" v-bind:maxlength="140" @input="descArea" v-model="upload_form.content"></textarea>
            <span style="font-size:10px;float:right;color: #409eff;">剩余字数 {{surplus}}/140</span>
          </div>
          <!-- 发布 -->
          <el-button id="publish" size="small" type="primary" @click="upload">点击上传</el-button>
        </div>
      </div>
    </work-dialog>
  </div>
</template>

<script>
import { isEmpty, getStore } from "../utils.js";
import { mapState, mapMutations } from "vuex";
import { items, cards, works, upload_form } from "../data/localData.js";
import Api from "../data/api.js";
export default {
  name: "HomePage",
  components: {
    toolbar: require("../components/Toolbar.vue").default,
    workDialog: require("../components/Dialog.vue").default,
    imgUpload: require("../components/upload-img.vue").default
  },
  data: function() {
    return {
      default_user_img: "./static/imgs/avatar.jpg",
      show_snap: false,
      type: "success",
      snap_text: "欢迎来到微笑明信片，让我们一起分享快乐吧 φ(゜▽゜*)♪",
      upload_form,
      items,
      cards,
      works,
      isShowWorkArea: false,
      surplus: 140
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
    showSnap: function(type, text) {
      this.show_snap = true;
      this.type = type;
      this.snap_text = text;
      window.setTimeout(() => {
        this.show_snap = false;
      }, 800);
    },
    goPersonalPage: function() {
      console.log(this);
      this.$router.push({ path: "/personal" });
    },
    showUploadWorkDialog: function() {
      this.isShowWorkArea = true;
    },
    closeDialog: function() {
      this.isShowWorkArea = false;
    },
    secelted(data) {
      console.log(data);
      this.upload_form.data = data;
    },
    upload: function() {
      let that = this;
      this.upload_form.name = this.username;
      console.log(this.upload_form.data);
      console.log(this.upload_form.name);
      console.log(this.upload_form.content);
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
              that.showSnap("error", "上传失败");
            } else {
              that.showSnap("success", response.body.message);
              that.upload_form.data = "";
              that.upload_form.content="";
              that.upload_form.name = "";
              that.closeDialog();
            }
          },
          () => {
            that.showSnap("error", "上传失败");
          }
        );
      } else {
        that.showSnap("error", "请保证您的明信片完整");
      }
    },
    descArea() {
      var textVal = this.upload_form.content.length;
      this.surplus = 140 - textVal;
    }
  }
};
</script>

<style >
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
  position: relative;
  width: 1000px;
  background: #fff;
  margin-top: 30px;
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
  margin: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  align-items: center;
  padding: 10px;
  background-color: #fff;
}

.card-item-img {
  width: 200px;
  object-fit: cover;
  min-width: 100%;
  background: white;
  padding-bottom: 6px;
  border-bottom: 1px solid #e1e1e1;
}

.card-item-userinfo {
  background: white;
  font-size: 10px;
  line-height: 18px;
  text-align: left;
  font-weight: 600;
  color: #409eff;
}

.card-item-content {
  padding: 6px 0;
  line-height: 18px;
  text-align: left;
  font-size: 12px;
  word-wrap: break-word;
  word-break: break-all;
  width: 220px;
}

.card-item-operator {
  margin: 10px 0;
  line-height: 1.35em;
}

.like {
  display: inline-block;
  width: auto;
  height: 12px;
  line-height: 16px;
  font-size: 12px;
  margin-right: 10px;
}

.like-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  vertical-align: bottom;
  background: url(/static/imgs/unlike.svg) 0 0 no-repeat;
}

.share {
  display: inline-block;
  width: auto;
  height: 12px;
  line-height: 16px;
  font-size: 12px;
  margin-right: 10px;
}

.share-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  vertical-align: bottom;
  background: url(/static/imgs/unshare.svg) 0 0 no-repeat;
}

#snap {
  left: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
}

#float-ball {
  position: fixed;
  border-radius: 50%;
  bottom: 100px;
  right: 100px;
  width: 60px;
  height: 60px;
  z-index: 100;
  background: #409eff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.dialog_upload_main {
  padding: 50px;
  display: flex;
  flex-direction: row;
}
.work-content {
  margin-left: 40px;
  display: flex;
  flex-direction: column;
}

.work-username {
  padding: 6px;
  font-size: 10px;
  line-height: 18px;
  text-align: left;
  font-weight: 600;
  color: #409eff;
}

.edit-content {
  margin-top: 5px;
}

.card-add-content {
  display: block;
  margin: auto;
  width: 215px;
  height: 100px;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 1.42858;
}

#publish {
  margin-top: 30px;
}
</style>
