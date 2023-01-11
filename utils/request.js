
export default function requese(config){
	return new Promise((resolve)=>{
		uni.request({
				url: config.url, //仅为示例，并非真实接口地址。
			    data:config.data,
			    header: {
			        'custom-header': 'hello' //自定义请求头信息
			    },
			    success: (res) => {
			       resolve(res.data.data);
			    }
			
		})
	})
}