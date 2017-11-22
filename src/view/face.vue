<template lang="pug">
	el-container.common.face(v-loading="loading" element-loading-text="拼命检测中")
		el-header(height="60px")
			.home.pull-left.pointer(@click="goHome")
				i.el-icon-Mark-Home
			el-button.pull-right(@click="logout") 退出		
		el-main
			.header 
				el-button( type="primary" @click="identify" v-if="pageType == 'identify'" :disabled="selectedImg.length == 0") 识别
				el-button( type="primary" @click="identify" v-if="pageType == 'result'" :disabled="true") 结果
			.container(v-if="pageType == 'identify'")
				el-row(:gutter="40")
					el-col.imageItem(:span="10" v-for="file in fileList" key="file" @click="selectImg(file)" :class="{'selected':file.selected}")
						img(:src="host + file.src +'?/timestamp='+timestamp" @click="selectImg(file)")
			.container(v-if="pageType == 'result'")
				p.resultName 检测结果
				el-row(:gutter="40")
					el-col.imageItem(:span="6" v-for="file in resultImgs" key="file" )
						img(:src="host + file +'?/timestamp='+timestamp" @click="enlarge(file)")
				p.resultName 识别结果
				el-row(:gutter="40")
					el-col.imageItem(:span="6" v-for="file in fileList" key="file" )
						img(:src="host + file +'?/timestamp='+timestamp" @click="enlarge(file)")
		el-dialog(:visible.sync="dialogVisible" @click=" dialogVisible = false")
			img(:src="host + dialogfile +'?/timestamp='+timestamp" style="width:100%")
</template>

<script>
import { Message } from 'element-ui'
import router from '@/router'
import Cookies from 'js-cookie'
import axios from 'axios'
import _ from 'lodash';
export default {
  name: 'login',
  components: {
  },
  data () {
    return {
			dialogVisible:false
			, dialogfile:null
			, loading:false
			, fileList:[]
			, host:'http://10.10.59.35:9000/'
			, pageType : 'identify'
			, resultImgs : []
			, selectedImg:[]
			, timestamp :null
    }
  },
  computed: {

  },
  methods: {
    selectImg(file){
			console.log('selected')
			var that = this
			if(this.pageType != 'identify') return false
			file.selected = !file.selected
			this.selectedImg = _.filter(that.fileList,{selected:true})
		}
		, enlarge(file){
			this.dialogVisible = true
			this.dialogfile = file
		}
		,logout(){
			Cookies.remove('login')
    	Cookies.remove('imgList')
			router.push('login')
		}
		,goHome(){
			router.push('index')
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
			this.loading = true
			axios.post('/ai/api_v1/face_verifcation',{image_names:selectedImgList}).then(function(e){
				console.log(e)				
				if(e.data.status == 1){
					that.resultImgs = e.data.data.check
					that.fileList = e.data.data.recognition					
					that.timestamp = Date.parse(new Date())/1000
					that.loading = false
					that.pageType = 'result'
				}
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
		// console.log(file)
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
			.imageItem{				
				&.selected{
					img{
						border:2px solid #34b6cd;
					}					
				}				
				img{
					width: 100%;
					height: 100%;
					border:2px solid transparent;
				}
			}
		}
	}
</style>
