<template>
	<view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow:() => {
			if(!uni.getStorageSync('cookie')){
				uni.navigateTo({
					url:'pages/loign/loign'
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("profile.css");
</style>
