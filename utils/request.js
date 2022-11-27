const baseUrl = "https://netease-cloud-music-api-beta-lime.vercel.app"
export default{
	get(url,data){
		let cookie = uni.getStorageSync('cookie');
		return new Promise((resolve,reject) => {
			uni.request({
				method:"GET",
				url:baseUrl+url,
				data:data,
				dataType:'json',
				header:{
					'authorization':cookie
				},
				success:(res) => {
					if(res.data.code === 400){
						uni.removeStorageSync("cookie");
						uni.showModal({
							title:"提示",
							content:"登陆后获取相关内容",
							success:(res) => {
								if(res.confirm){
									//跳转至登陆页
									uni.navigateTo({
										url:'@/../pages/loign/loign'
									})
								}else if(res.cancel){
									uni.showToast({
										title:"取消登录",
										icon:"none"
									})
								}
							}
						})
					}
					resolve(res.data)
				},
				fail:(err) => {
					uni.showToast({
						title:"获取接口失败",
						icon:"none"
					})
					reject(err)
				}
			})
		});
	},
	post(url,data){
		let cookie = uni.getStorageSync("cookie")
		return new Promise((resolve,reject) => {
			uni.request({
				method:"POST",
				url:baseUrl+url,
				data:data,
				header:{
					'authorization':cookie,
					'content-type':'application/json'
				},
				dataType:'json', //只能写 'json' 千万不能用JSON
				success:(res) => {
					if(res.data.code === 400){
						uni.removeStorageSync("cookie")
						uni.showModal({
							title:"提示",
							content:"登陆后查看数据",
							success:(res) => {
								if(res.confirm){
									uni.navigateTo({
										url: "@/../pages/loign/loign"
									})
								}else if(res.cancel){
									uni.showToast({
										title:"取消登录",
										icon:"none"
									})
								}
							}
						})
					}
					resolve(res.data)
				},
				fail:(err) => {
					uni.showToast({
						title:"获取接口失败",
						icon:"none"
					})
					reject(err)
				}
			})
		})
	}
}