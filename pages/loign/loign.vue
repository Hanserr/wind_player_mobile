<template>
	<view class="login-main">
		<view class="content">
			<input type="text" placeholder="手机号" v-model='phone' class="phone-inp" placeholder-style="color:#aec5d8" maxlength="11"/>
			<view class="code-area">
				<input type="text" placeholder="验证码" v-model='code' class="code-inp" placeholder-style="color:#aec5d8" maxlength="4"/>
				<button @click="getCode(phone)" class="code-button" :disabled="disableMark">{{buttonTitle}}</button>
			</view>
			<button @click="verify(phone,code)" class="login-button">登录</button>
		</view>
	</view>
</template>

<script>
	import api from '@/utils/apiCollection.js'
	export default {
		data() {
			return {
				phone:'',
				code:'',
				buttonTitle:'获取验证码',
				countdownTimer:'', //倒计时器
				disableMark:false,
				
			}
		},
		methods: {
			//获取验证码
			getCode(phone){
				const phoneReg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
				if (!phoneReg.test(phone)){
					uni.showToast({
						title:"手机号格式有误!",
						icon:'none'
					})
					return
				}
				this.$post(`${api.GET_CAPTCHA}?phone=${phone}&timestamp=${new Date()}`).then(res => {
					if(res.code === 200){
						this.disableMark = true
						let countdownNumber = 60
						this.countdownTimer = setInterval(() => {
							if(countdownNumber === 0){
								this.disableMark = false
								this.buttonTitle = "获取验证码"
								clearInterval(this.countdownTimer)
								return
							}
							this.buttonTitle = `${countdownNumber--}秒后重发`
						},1000)
						uni.showToast({
							title:"验证码发送成功，10分钟内有效，请注意查收!",
							icon:'none'
						})
					}else{
						uni.showToast({
							title:"获取验证码失败，请稍候再试！",
							icon:'error'
						})
					}
				})
			},
			//校验验证码
			verify(phone,code){
				this.$post(`${api.LOGIN_WITH_CODE}?phone=${phone}&captcha=${code}`).then(res => {
					console.log(res)
					if(res.code === 200){
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				})
			}
		},
	}
</script>

<style scoped>
@import url('login.css');
</style>
