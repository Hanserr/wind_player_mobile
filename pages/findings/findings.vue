<template>
	<view>
		<view class="slide-window-content" 
		@touchstart="startMovePop" 
		@touchmove="onMovePop"
		@touchend="stopMovePop"
		:style="{left:slideWindowPosition+'px'}">
			aaaaaaaaaaaaaaaaaaaa
		</view>
		
		<view
		class="slide-window-shadow" 
		@click.native="showMenu"
		:style="{backgroundColor:'rgb(0,0,0,'+(0.7-this.slideWindowPosition/-230)+')'}"
		v-show="slideWindowPosition !== -230">
		</view>
		
		<view class="top">
			<view class="menu-area" @click="showMenu">
				<image src="../../static/icons/menu.png" class="menu-icon"></image>
			</view>
			<view class="search-inp-area">
				<image src="../../static/icons/search.png"></image>
				<view class="fake-search-inp"/>
			</view>
			<view class="placeholder-area"></view>
		</view>
		
		<view class="middle">
			
		</view>
		
		<view class="bottom">
			
		</view>
		
		<tabbar :current="1"></tabbar>
	</view>
</template>

<script>
	import tabbar from '@/components/tabbar/tabbar.vue'
	export default {
		data() {
			return {
				slideWindowPosition:-230, //侧边菜单栏初始位置
				orignalX:0, //滑动侧边栏的初始值
			
			}
		},
		methods: {
			//展示侧边菜单栏
			showMenu(){
				if(this.slideWindowPosition === 0){
					this.slideWindowPosition = -230
					uni.showTabBar()
				}
				else{
					uni.hideTabBar()
					this.slideWindowPosition = 0
				}
			},
			//开始移动菜单栏
			startMovePop(e){
				this.orignalX = e.changedTouches[0].clientX
			},
			//正在移动菜单栏
			onMovePop(e){
				let distance = e.changedTouches[0].clientX - this.orignalX
				this.slideWindowPosition = distance >= 0?0:distance
			},
			//停止移动菜单栏
			stopMovePop(e){
				this.orignalX = 0
				this.slideWindowPosition = this.slideWindowPosition<-150?-230:0
			}
		},
		onShow:() => {
			
		}
	}
</script>

<style scoped>
@import url("findings.css");
</style>
