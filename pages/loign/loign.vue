<template>
	<view class="login-main">
		<view class="content">
			<input type="text" placeholder="手机号" v-model='phone' class="phone-inp" placeholder-style="color:#aec5d8"/>
			<view class="code-area">
				<input type="text" placeholder="验证码" v-model='code' class="code-inp" placeholder-style="color:#aec5d8"/>
				<button @click="getCode(phone)" class="code-button">获取验证码</button>
			</view>
			<button @click="login" class="login-button">登录</button>
		</view>
	</view>
</template>

<script>
	import api from '@/utils/apiCollection.js'
	export default {
		data() {
			return {
				phone:'',
				code:''
			}
		},
		methods: {
			//获取验证码
			getCode(phone){
				this.$post(`${api.GET_CAPTCHA}?phone=${phone}`).then(res => {
					console.log(res)
				})
			},
		}
	}
</script>

<style scoped>
@import url('login.css');
</style>
