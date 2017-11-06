<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import '~normalize.css/normalize.css';// normalize.css 样式格式化
@import url("./assets/iconfont/iconfont.css"); //图标字体
  html , body , #app {
    height: 100%;
    width: 100%;
    min-width: 1280px;
    font-size: 12px;
    color: #333;
  }

  $blue:#409EFF;
  $success:#67C23A;
  $warning:#EB9E05;
  $danger:#FA5555;
  $info:#878D99;
  .text-blue{color: $blue;}
  .text-success{color: $success;}
  .text-warning{color: $warning;}
  .text-danger{color: $danger;}
  .text-info{color: $info;}

  [class^="el-icon-Mark"], [class*="el-icon-Mark"] {
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a{
    text-decoration:none;
  }
  *{
    box-sizing: border-box;
  }
  *{
    margin:0;
    padding:0;
  }
  .pull-left{
    float: left;
  }
  .pull-right{
    float: right;
  }
  .clearfix{
    clear: both;
  }
  .pointer{
    cursor: pointer;
  }
  .margin-right-10{
    margin-right: 10px;
  }

  ::-webkit-scrollbar  
{  
    width: 10px;  
    height: 10px;  
    background-color: #F5F5F5;  
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: #999;  
}  /*滚动条和纵向滚动条相交处尖角的颜色 */
</style>
