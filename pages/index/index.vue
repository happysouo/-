<template>
	<view class="index-container">
		<!-- 顶部 -->
		<view class="top">
			<view class="search">
				<img src="@/static/logo.png" alt="">
			<uni-search-bar  placeholder="搜索商品,共1000000款好物" bgColor="#EEEEEE" @confirm="search" />
			</view>
			<view class="nav">
				<scroll-view class="scroll" scroll-x enable-flex scroll-with-animation :scroll-into-view="'nav'+categoryId">
					<view class="item" :class="item.extra.operationResource.categoryId===categoryId?'active':''" @click="tapNav(item.extra.operationResource.categoryId)" v-for="(item,index) in navList" :key="item.categoryName" :id="'nav'+item.extra.operationResource.categoryId">
						{{item.categoryName}}
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 下滑区域 -->
		<view class="bottom">
			<!-- 轮播图 -->
			<view >
				<swiper indicator-dots class="imagelist">
					<swiper-item class="item" v-for="item in bannerList" :key="item.picUrl">
						<image :src="item.picUrl" class="swiper-item"></image>
					</swiper-item>
					
			</swiper>
			</view>		
			
			<!-- 介绍 -->
			<view>
				<view class="inner">
					<ul class='inner-list'>
						<li class='item'>
							<i></i>
							<span>网易自营品牌</span>
						</li>
						<li>
							<i></i>
							<span>30天无忧退货</span>
						</li>
						<li>
							<i></i>
							<span>48小时快速退款</span>
						</li>
					</ul>
				</view>
			</view>
			
			<!-- 商品展示 -->
			<view class="goods">
				<view class="outer" v-for="item in kingKongList" :key="item.text">
					<view class="good-img">
						<img :src="item.picUrl" alt="">
					</view>
					<view class="text">
						{{item.text}}
					</view>
				</view>
			</view>
					
					
					<!-- 分类商品展示 -->
						<view class="category-goods">
							
							<!-- 内容 -->
							<view class="goods" v-for="list in categoryItemList">
								<!-- 标题 -->
								<view class="title">
									<view class="frontname">
										{{list.category.frontName}}
									</view>
									<view class="name">
										{{list.category.name}}
									</view>
								</view>
								<!--  -->
									<view class="outers" v-for="item in list.itemList">
										<img :src="item.listPicUrl" alt="">
										<view class="text">
										{{item.name}}
										</view>
										<view class="price">
										￥{{item.finalPriceInfoVO.priceInfo.basicPrice}}
										</view>
									</view>			
										
						
						</view>
					</view>
			
	</view>
	<!-- -123 -->
	
	
		
		</view>
</view>
	
</template>
<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				navList:[], //导航栏数据
				bannerList:[], //轮播图数据
				kingKongList:[], //kingkong
				categoryId:0, //导航高亮id
				categoryItemList:[], //分类列表数据
			}
		},
		onLoad() {

		},
		// 初始化发送请求
		created(){
			// 1.获取navList
			this.getNavList();
			
		},
		methods: {
			// 1.获取navList
			async getNavList(){
				const res=await request({
					url:'https://m.you.163.com/xhr/index.json',
				})
				this.navList=res.data.categoryHotSellModule.categoryList;
				// 初始设置下categoryId
				this.categoryId=this.navList[0].extra.operationResource.categoryId;
				this.bannerList=res.data.focusList;
				this.kingKongList=res.data.kingKongModule.kingKongList;
			},
			
			// 2.高亮nav+根据不同分类获取页面数据
			async tapNav(categoryId){
				this.categoryId=categoryId;
				const res=await request({
					url:`https://m.you.163.com/item/list.json?categoryId=${categoryId}`,
				})
				console.log(res,'cc');
				// 轮播图数据
				this.bannerList=res.currentCategory.bannerList;
				// 分类商品内容
				this.categoryItemList=res.categoryItemList.slice(0,5);
				
			},
		}
	}
</script>

<style lang="scss">
.index-container{
	height: 100%;
	
	.top{
		position: sticky;
		padding: 0 30rpx;
		.search{
			
			display:flex ;
			align-items: center;
			justify-content: space-between;
			image{
				width: 144rpx;
				height: 40rpx;
			}
			
		}	
		.nav{
			margin-bottom: 10rpx;
			font-size: 30rpx;
			.scroll{
				height: 60rpx;
				display: flex;
				white-space: nowrap;
				
				.item{
					margin-right: 40rpx;
					box-sizing: border-box;
					&.active{
						border-bottom: 2px solid #9473ef;
					}
					
				}
			}
			
		}
	}
	
	.bottom{
		height: calc(100vh-83);
		.imagelist{
			.item{
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.inner{
			margin-top: 16rpx;
			padding: 0 30rpx;
			.inner-list{
				display: flex;
				font-size: 28rpx;
				justify-content: space-around;
			}
		}
		
		.goods{
			display: flex;
			flex-wrap: wrap;
			
			.outer{
				font-size: 28rpx;
				margin-top: 10rpx;
				margin-left: 40rpx;
				.good-img {
					image{
						margin-top: 20rpx;
						width: 102rpx;
						height: 102rpx;
						border-radius: 40rpx;
					}
				}
				.text{
					
				}
				.price{
					
				}
			}
		}
		
		
		
		
	}
	// 
	.category-goods{
		margin-top: 40rpx;
		background-color: pink;
		
		
		.goods{
			.title{
				width: 100%;
				text-align: center;
				.frontname{
					
				}
				.name{
					font-size: 28rpx;
					color: darkgrey;
				}
			}
			font-size: 28rpx;
			margin-top: 10rpx;
			.outers {
				margin-left: 16rpx;
				image{
					margin-top: 20rpx;
					width: 350rpx;
					height: 350rpx;
					border-radius: 20rpx;
				}
			}
			.text{
				width: 350rpx;
			}
			.price{
				color: #fa5a38;
			}
		}
	}
	// 
	
}
	
</style>
