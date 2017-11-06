<template lang="pug">
	el-container.common.index
		el-header(height="60px")
			el-button.pull-right(@click="logout") 退出	
		el-main
			.header 选择类型
			.container
				ul.identyType
					li(@click="toggleType('face')" :class="{'selected': selectedType == 'face'}")
						span 人脸识别
						i.el-icon-Mark-FaceRecognition.pull-right
					li(@click="toggleType('yellow')" :class="{'selected': selectedType == 'yellow'}")
						span 鉴黄
						i.el-icon-Mark-Identification.pull-right
				.uploadFile
					.uploadInput
						el-upload.upload-demo(ref="uploadFile" name="image_path" :on-success="sucessUpload" :action="selectedType == 'face' ? '/api_v1/face_upload' : '/api_v2/upload_files'" :auto-upload="false" :multiple="true" :on-change="changeUploadFile" :before-upload="beforeUploadFile" :show-file-list="false")
							el-button(slot="trigger" type="primary") 选取文件
						el-input(v-model="upload.name" auto-complete="off" :disabled="true")
							el-button(slot="append") 选取文件
					el-button(slot="append" @click="submitUpload") 上传
</template>

<script>
import { Message } from 'element-ui'
import router from '@/router'
import Cookies from 'js-cookie'
import axios from 'axios'
export default {
  name: 'login',
  components: {
  },
  data () {
    return {
			selectedType:'face'		
			,uploadFileList:[]			
			,upload:{
			}
			, 
    }
  },
  computed: {

  },
  methods: {
    toggleType (type){
			this.selectedType = type
		}
		,logout(){
			Cookies.remove('login')
    	Cookies.remove('imgList')
			router.push('login')
		}
		,changeUploadFile(e){
			this.upload = e
			console.log('changeUploadFile',e)
		}
		,submitUpload(){
			console.log('submitUpload',this.$refs.uploadFile)
			var that = this	
			that.$refs.uploadFile.submit()
		}
		,beforeUploadFile(e){
			console.log(e)
		}
		,sucessUpload (e) {
			Cookies.set('imgList',JSON.stringify(e.data) )
			this.selectedType == 'face' ? router.push('face') :		router.push('yellow')
		}
	}
	,mounted(){
		var login = Cookies.get('login')
		console.log('mouted',login)
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
			.identyType{
				// height: 150px;
				list-style: none;
				padding:20px 10px;
				overflow: hidden;
				li{
					float: left;
					height: 100px;
					width: 300px;
					border:1px solid; 
					margin-right: 20px;
					color: #fff;
					font-size: 20px;
					&:first-of-type{
						background-color: #939fe7;
					}
					&:nth-of-type(2){
						background-color: #ccde71
					}
					&.selected{
						border: 2px solid #34b6cd;
					}
					i{
						font-size: 100px;
					}
					>span{
						line-height: 160px;
						padding-left: 10px;
					}
				}
			}
			.uploadFile{
				height: 120px;				
				width: 100%;
				background-color: #f3f3f2;
				padding:30px 10px ;
				.uploadInput{
					position: relative;
					.upload-demo{
						position: absolute;
						z-index: 1;
						top: 0;
						right: 0;
					}
					padding-bottom: 20px;
				}	
			}
		}
	}
</style>
