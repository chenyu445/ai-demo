<template lang="pug">
	el-container.common.yellow(v-loading="loading" element-loading-text="拼命检测中")
		el-header(height="60px")
			.home.pull-left.pointer(@click="goHome")
				i.el-icon-Mark-Home
			el-button.pull-right(@click="logout") 退出
		el-main
			.header 
				el-button( type="primary" @click="identify" v-if="pageType == 'identify'" :disabled="selectedImg.length == 0") 识别
				span(v-if="pageType == 'result'" :disabled="true") 共鉴别{{ok.length+bad.length+error.length}}张图片，{{ok.length}}张正常，{{bad.length}}张疑似非正常,{{error.length}}张图片格式异常
				div.pull-right.info(v-if="pageType == 'identify'")
					el-checkbox(v-model="selectedAll" :indeterminate="!selectedAll && selectedImg.length != 0 " @change="toggleSelectedAll") 已选{{selectedImg.length}}张图片(共上传{{fileList.length}}张图片})
			.container
				el-card.pull-left.imageItem(v-for="file in fileList" key="file" @click="selectImg(file)" :class="{'selected':file.selected}" v-if="pageType == 'identify' ")
					img(:src="host + file.src" @click="selectImg(file)")
				div.ok(v-if="pageType != 'identify' ")
					p.text-blue.resultName 正常图片
					el-card.pull-left.imageItem(v-for="file in ok" key="file"   )
						img(:src="host + file")
					.clearfix
				div.bad(v-if="pageType != 'identify' ")
					p.text-danger.resultName 疑似非正常图片
					el-card.pull-left.imageItem(v-for="file in bad" key="file"   )
						img(:src="host + file+'?/timestamp='+timestamp")
					.clearfix
				div.error(v-if="pageType != 'identify' ")
					p.text-warning.resultName 图片格式异常
					el-card.pull-left.imageItem(v-for="file in error" key="file"   )
						img(:src="host + file+'?/timestamp='+timestamp")
					.clearfix
</template>

<script>
import { Message } from 'element-ui'
import router from '@/router'
import Cookies from 'js-cookie'
import _ from 'lodash';
import axios from 'axios'
export default {
  name: 'login',
  components: {
  },
  data () {
    return {
			loading:false,
			fileList:[]
			,host:'http://10.10.59.84:9100/'
			, pageType: 'identify'
			, resulutImgs:[]
			, ok:[]
			, bad:[]
			, error:[]
			, selectedImg:[]
			, selectedAll: false
			, timestamp :null
    }
  },
  computed: {

  },
  methods: {
    selectImg(file){
			console.log('selected')
			file.selected = !file.selected
			var that = this
			this.selectedImg = _.filter(that.fileList,{selected:true})
			this.selectedAll = this.selectedImg.length == this.fileList.length
		}
		,toggleSelectedAll(){
			var that = this
			for(var i = 0; i < this.fileList.length; i++){
				this.fileList[i].selected =  that.selectedAll
			}
			console.log('toggleSelectedAll')
			this.selectedImg = _.filter(that.fileList,{selected:true})
			// this.selectedAll = this.selectedImg.length == this.fileList.length
		}
		,goHome(){
			router.push('index')
		}
		,logout(){
			Cookies.remove('login')
    	Cookies.remove('imgList')
			router.push('login')
		}
		,identify (){
			var that = this
			var selectedImgList = []
			for (var index = 0; index < this.fileList.length; index++) {
				var element = this.fileList[index];
				if(element.selected){
					selectedImgList.push(element.src)
				}
			}
			that.loading = true
			axios.post('/api_v2/validator',{image_names:selectedImgList}).then(function(e){
				console.log(e)
				if(e.data.status == '1'){
					e.data.data.forEach(function(d){
						if(d[1] == 0){
							that.ok.push(d[0])
						}else if(d[1] == 1){
							that.bad.push(d[0])
						}else{
							that.error.push(d[0])
						}
					})
					that.pageType = 'result'
				}else{
					Message({
						message: 'error',
						type: 'error',
						duration: 0
					})
				}
				that.loading = false				
			})
			// var selectedImgList = _.where(that.fileList,{selected:true})
			// console.log('selectedImgList:', selectedImgList)
		}
	},
	mounted(){
		var login = Cookies.get('login')
		var cookies = Cookies.withConverter(function (value, name) {
				if ( name === 'escaped' ) {
						return unescape(value);
				}
		});
		var file =JSON.parse(cookies.get('imgList')) 
		console.log(file)
		var that = this
		that.fileList = []
		file.forEach(function(el) {
			that.fileList.push({
				selected:false,
				src:el
			})
		});
		this.timestamp = Date.parse(new Date())/1000
		if(login){
			console.log(login)
		}else{
			router.push('login')
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss">
	.common{
		height: 100%;
		position: relative;
		background-color: #292e3c;
		color: #333;
		display: block;
		width:100%;	
		padding:60px;	
		padding-bottom:120px;		
		header{
			// position: relative;
			.home{
				i{
					color: #fff;
					font-size: 50px;
				}
			}
		}	
		.resultName{
			font-size: 18px;
			padding:10px 0;
		}
		main{
			height: 100%;
			border-radius: 5px;
			background-color: #f3f3f2;	
			padding:0;
			padding-top:20px;		
			.header{
				height: 50px;;
				font-size: 24px;
				padding: 0px 10px;
			}
			.container{
				background-color: #fff;
				padding:20px;
				overflow: hidden;
			}
			
		}
		.yellow{
			.imageItem{
				width: 150px;
				height: 200px;
				margin-right:10px;
				margin-bottom: 10px;
				&.selected{
					border:2px solid #34b6cd;
				}
				.el-card__body{
					height: 100%;
					padding:0
				}
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
