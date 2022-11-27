<template>
	<view>
		<input type="text" placeholder="用户名" v-model='phone' class="phone-in" placeholder-style="color:#aec5d8"/>
		<input type="text" placeholder="密码" v-model='code' class="phone-in" placeholder-style="color:#aec5d8"/>
		<button @click="login" class="login-button">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				code:''
			}
		},
		methods: {
			login:() => {
				console.log(this.phone, this.code)
				return
				// let user = {
				// 	phone:this.phone,
				// 	pwd:this.code
				// }
				// uni.request({
				// 	url:'192.168.200.123:10001/login',
				// 	method:'POST',
				// 	data:user,
				// 	success:(res) => {
				// 		console.log(res)
				// 	}
				// })
			}
		}
	}
</script>

<style>
@import url('login.css');
</style>
