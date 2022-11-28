<template>
	<view>
		<view class="status-bar"></view>
		<view class="slide-window-content" 
		@touchstart="startMovePop" 
		@touchmove="onMovePop"
		@touchend="stopMovePop"
		:style="{left:slideWindowPosition+'px'}">
		<!-- 侧边栏内容区域 -->
		</view>
		
		<view
		class="slide-window-shadow" 
		@click.native="showMenu"
		:style="{backgroundColor:'rgb(0,0,0,'+(0.7-this.slideWindowPosition/-260)+')'}"
		v-show="slideWindowPosition !== -260">
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
			<view class="swiperArea">
				<swiper
				:indicator-dots="true"
				:autoplay="true"
				:interval="5000"
				:circular="true"
				class="bannerSwiper">
					<swiper-item v-for="(b,index) in bannerList" :key="index" class="bannerItem">
						<image :src="b.imageUrl"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view class="bottom">
			
		</view>
		
		<tabbar :current="1"></tabbar>
	</view>
</template>

<script>
	import tabbar from '@/components/tabbar/tabbar.vue'
	import api from '@/utils/apiCollection.js'
	export default {
		data() {
			return {
				slideWindowPosition:-260, //侧边菜单栏初始位置
				orignalX:0, //滑动侧边栏的初始值
				bannerList:'', 
				
				
			}
		},
		methods: {
			//展示侧边菜单栏
			showMenu(){
				if(this.slideWindowPosition === 0){
					this.slideWindowPosition = -260
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
				this.slideWindowPosition = this.slideWindowPosition<-150?-260:0
			},
			//获取首页banner
			getBanner(){
				this.$get(`${api.GET_BANNER}`).then(res => {
					if(res.code === 200){
						this.bannerList = res.banners
					}else{
						uni.showToast({
							title:"获取banner失败",
							icon:"none"
						})
					}
					console.log(res)
				})
			},
			
		},
		onShow:() => {
			
		},
		//页面解析完成
		onReady(){
		    //动态修改状态栏的颜色
		    uni.setNavigationBarColor({
		        frontColor: '#000000',
		        backgroundColor: 'while'
		    })
		},
		//元素加载完成
		onLoad(){
			this.getBanner()
			
		}
	}
</script>

<style scoped>
@import url("findings.css");
</style>
