<template>
	<view>
		<tabbar :current="2"></tabbar>
	</view>
</template>
<script>
	import tabbar from '@/components/tabbar/tabbar.vue'
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
