<template lang="pug">
	.login
		.user
			.logo
				.pic
					i.el-icon-MV-model
				p 模型验证
			el-form(:model="form" :rules="rules")
				el-form-item(prop="userName")
					el-input(placeholder="用户名",icon="MV-user",v-model.trim.lazy="form.user_name")
				el-form-item(prop="passWord")
					el-input(placeholder="密码",type="password",icon="MV-password",v-model.trim.lazy="form.password")
				el-button.submit(type="primary" @click="onSubmit") 登录
</template>

<script>
import SHA256 from 'js-sha256'
import userService from "@/api/user"
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
      form:{
				user_name :'',
				password :''
			}
			,rules:{
				userName:[
					{ required: true, message: '请输入用户名', trigger: 'blur' },
				]
				,passWord:[
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			}		
    }
  },
  computed: {

  },
  methods: {
    onSubmit () {
			axios.post('/ai/api_v2/login',this.form).then((data)=>{
				console.log(data)
				if(data.data.status == '1'){
					Cookies.set('login', 'isLogin')
					router.push('index')
				}else{
					Message({
					message: '用户名或密码错误',
					type: 'error',
					duration: 0
				})
				}
			},(error)=>{
				cnsole.log(error)
				Message({
					message: '系统错误',
					type: 'error',
					duration: 0
				})
			})	
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
	.login{
		height: 100%;
		position: relative;
		background-color: #292e3c;
		.user{
			background-color: #efefef;
			width:310px;
			height: 400px;
			position: absolute;
			left:50%;
			top: 50%;
			margin-left: -155px;
			margin-top: -220px;
			.logo{
				background-color: #1eb4e1;
				height: 140px;
				text-align: center;
				padding-top:20px;
				.pic{
					display: inline-block;
					width: 70px;
					height: 70px;
					line-height: 70px;
					border-radius: 50%;
					background-color: #59c1fc;
					.el-icon-MV-model{
						display: inline-block;
    				vertical-align: middle;
						font-size: 50px;
						background-color: #1186b8;
						height: 60px;
						width: 60px;
						border-radius: 50%;
						border:2px solid #fff;
						box-sizing: border-box;
						color: #fff;
					}
				}
			}
			.el-form{
				padding:20px 14px;
				>div,>button{
					margin-top:20px;
				}
				.submit{
					display: block;
					width: 100%;
				}
			}
		}
	}
</style>
