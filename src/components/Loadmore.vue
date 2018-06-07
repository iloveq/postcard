<template>
  <div class="my-loadmore">
    <div class="loadmore-content" :class="{'is-dropped':topDropped || bottomDropped}"
         :style="{'transform':'translate3d(0,'+translate+'px,0)'}">
      <slot name="top">
        <div class="my-loadmore-top" v-if="topMethod">
          <span>{{topText}}</span>
        </div>
      </slot>
      <slot></slot>
      <slot name="bottom">
        <div class="my-loadmore-bottom" v-if="bottomMethod && !allBottomLoaded">
          <span>{{bottomText}}</span>
        </div>
      </slot>
      <slot name="nomore">
        <div class="no-more" v-if="allBottomLoaded">
          <span>{{noMoreText}}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  let throttle=function(fn,delay){
    let now , lastExec , timer , context , args
    let excute=function(){
      fn.apply(context,args)
      lastExec = now
    }
    return function(){
      context = this
      args = arguments
      now = Date.now()
      if(timer){
        clearTimeout(timer)
        timer = null
      }
      if(lastExec){
        let diff =delay - (now-lastExec)
        if(diff<0){
          excute()
        }else{
          timer=setTimeout(()=>{
            excute()
          },delay)
        }
      }else{
        excute()
      }
    }
  }
  export default {
    props: {
      noMoreText:{
        type:String,
        default:'没有更多了!'
      },
      maxDisdance: {
        type: Number,
        default: 0
      },
      distanceIndex: {
        type: Number,
        default: 2
      },
      autoFill: {
        type: Boolean,
        default: true
      },
      topMethod: {
        type: Function
      },
      topPullText: {
        type: String,
        default: "下拉刷新"
      },
      topDropText: {
        type: String,
        default: "释放更新"
      },
      topLoadingText: {
        type: String,
        default: "更新中..."
      },
      topDistance: {
        type: Number,
        default: 50
      },
      bottomMethod: {
        type: Function
      },
      bottomPullText: {
        type: String,
        default: "上拉加载更多"
      },
      bottomDropText: {
        type: String,
        default: "释放加载更多"
      },
      bottomLoadingText: {
        type: String,
        default: "加载中..."
      },
      bottomDisdance: {
        type: Number,
        default: 50
      },
      allBottomLoaded: {
        type: Boolean,
        default: false
      },
      isAutoLoadmore: {
        type: Boolean,
        default: false
      },
      preLoadingDistance: {
        type: Number,
        default: 50
      }
    },
    data(){
      return {
        topText: "top",
        bottomText: "bottom",
        topStatus: "",
        bottomStatus: "",
        scrollEventTarget: null,
        containerFilled: false,
        translate: 0,
        topDropped: false,
        bottomDropped: false,
        bottomReached: false,
        startY: 0,
        startScrollTop: 0,
        currentY: 0
      }
    },
    watch: {
      topStatus(val){
        this.$emit('top-status-change', val)
        switch (val) {
          case 'pull':
            this.topText = this.topPullText
            break;
          case 'drop':
            this.topText = this.topDropText
            break;
          case 'loading':
            this.topText = this.topLoadingText
            break;
        }
      },
      bottomStatus(val){
        this.$emit('bottom-status-change', val)
        switch (val) {
          case 'pull':
            this.bottomText = this.bottomPullText
            break;
          case 'drop':
            this.bottomText = this.bottomDropText
            break;
          case 'loading':
            this.bottomText = this.bottomLoadingText
            break;
        }
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      init(){
        this.topStatus = 'pull'
        this.bottomStatus = 'pull'
        this.topText = this.topPullText
        this.scrollEventTarget = this.getScrollEventTarget(this.$el)
        if (typeof this.bottomMethod === 'function') {
          this.fillContainer()
          this.bindTouchEvents()
        }
        if (typeof this.topMethod === 'function') {
          this.bindTouchEvents()
        }
        if (this.isAutoLoadmore) {
          let throttleFn = throttle(this.checkBottomReached, 200)
          this.scrollEventTarget.addEventListener('scroll', throttleFn)
        }
      },
      onTopLoaded(){
        this.translate = 0
        setTimeout(() => {
          this.topStatus = 'pull'
        }, 200)
      },
      onBottomLoaded(){
        this.bottomStatus = 'pull'
        this.bottomDropped = false
        this.$nextTick(() => {
          if (this.scrollEventTarget == window) {
            if (document.documentElement.scrollTop) {
              document.documentElement.scrollTop += 50
            }
          } else {
            if(this.scrollEventTarget.scrollTop){
              this.scrollEventTarget.scrollTop += 50
            }
          }
          this.translate = 0
        })
        if (!this.allBottomLoaded && !this.containerFilled) {
//              this.fillContainer()
        }
      },
      fillContainer(){
        if (this.autoFill) {
          this.$nextTick(() => {
            if (this.scrollEventTarget === window) {
              this.containerFilled = this.$el.getBoundingClientRect().bottom >= document.documentElement.getBoundingClientRect().bottom
            } else {
              this.containerFilled = this.scrollEventTarget.getBoundingClientRect().bottom >= document.documentElement.getBoundingClientRect().bottom
            }
          })
          if (!this.containerFilled) {
            this.bottomStatus = 'loading'
            this.bottomMethod()
          }
        }
      },
      getScrollEventTarget(element) {
        let currentNode = element;
        while (currentNode && currentNode.tagName !== 'HTML' &&
        currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
          let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
          if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode
          }
          currentNode = currentNode.parentNode
        }
        return window;
      },
      getScrollTop(el){
        if (el == window) {
          return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
        } else {
          return el.scrollTop
        }
      },
      checkBottomReached(){
        if (this.scrollEventTarget === window) {
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
          if (this.isAutoLoadmore 
                && scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight - this.preLoadingDistance
                && this.bottomStatus != 'loading' && !this.allBottomLoaded) {
            this.bottomStatus = 'loading'
            this.bottomMethod().then((res) => {
              this.bottomStatus = 'pull'
            })
          }
          return scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight
        } else {
          if (this.isAutoLoadmore 
                && this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1 + this.preLoadingDistance
                && this.bottomStatus != 'loading' && !this.allBottomLoaded) {
            this.bottomStatus = 'loading'
            this.bottomMethod().then((res) => {
              this.bottomStatus = 'pull'
            })
          }
          return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1
        }
      },
      bindTouchEvents(){
        this.$el.addEventListener('touchstart', this.handleTouchStart)
        this.$el.addEventListener('touchmove', this.handleTouchMove)
        this.$el.addEventListener('touchend', this.handleTouchEnd)
      },
      handleTouchStart(event){
        this.startY = event.touches[0].clientY
        this.startScrollTop = this.getScrollTop(this.scrollEventTarget)
        this.bottomReached = false
        if (this.topStatus !== 'loading') {
          this.topStatus = 'pull'
          this.topDropped = false
        }
        if (this.bottomStatus !== 'loading') {
          this.bottomStatus = 'pull'
          this.bottomDropped = false
        }
      },
      handleTouchMove(event){
        if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
          return
        }
        this.currentY = event.touches[0].clientY
        let distance = (this.currentY - this.startY) / this.distanceIndex
        this.direction = distance > 0 ? 'down' : 'up'
        if (typeof this.topMethod == 'function' && this.direction == 'down' && this.getScrollTop(this.scrollEventTarget) == 0 && this.topStatus != 'loading') {
          event.stopPropagation()
          event.preventDefault()
          this.translate = distance - this.startScrollTop
          if (this.translate < 0) {
            this.translate = 0
          }
          this.topStatus = this.translate > this.topDistance ? 'drop' : 'pull'
        }
        if (this.direction == 'up') {
          this.bottomReached = this.bottomReached || this.checkBottomReached()
        }
        if (typeof this.bottomMethod == 'function' && this.direction == 'up' && this.bottomStatus != 'loading' && this.bottomReached && !this.allBottomLoaded) {
          event.preventDefault()
          event.stopPropagation()
          this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance
          if (this.translate > 0) {
            this.translate = 0
          }
          this.bottomStatus = this.translate < -this.bottomDisdance ? 'drop' : 'pull'
        }
        this.$emit('change-translate', this.translate)
      },
      handleTouchEnd(){
        if (this.direction == 'down' && this.getScrollTop(this.scrollEventTarget) == 0 && this.translate > 0) {
          this.topDropped = true
          if (this.topStatus == 'drop') {
            this.translate = 50
            this.topStatus = 'loading'
            this.topMethod()
          } else {
            this.topStatus = 'pull'
            this.translate = 0
          }
        }
        if (this.direction == 'up' && this.bottomReached && this.translate < 0) {
          this.bottomDropped = true
          if (this.bottomStatus == 'drop') {
            this.translate = -50
            this.bottomStatus = 'loading'
            this.bottomMethod()
          } else {
            this.bottomStatus = 'pull'
            this.translate = 0
          }
        }
        this.$emit('change-translate', this.translate)
      }
    }
  }
</script>

<style>
  .my-loadmore {
    overflow: hidden;
  }
  .my-loadmore .no-more{
    line-height: 50px;
    text-align: center;
  }
  .my-loadmore .is-dropped {
    transition: all .2s;
  }
  .loadmore-content .my-loadmore-top {
    margin-top: -50px;
    line-height: 50px;
    text-align: center;
  }
  .loadmore-content .my-loadmore-bottom {
    margin-bottom: -50px;
    line-height: 50px;
    text-align: center;
  }
</style>