import list from '../../pages/entry/data/index';
Page({
    data: {
        markers: [],
        subMarkers: [],
        mapSetting: {
          // 控制地铁图层的显示与隐藏
          subwayShow: false,
          // 控制交通图层的显示与隐藏
          trafficShow: false
        },
        polyline: [{ // 绘制多边形区域，两个点绘制直线
          points: [ // 这里传入两个点是直线，如果传入三个点以上就会是首尾相连的多边形区域
            {
              longitude: 113.3245211,
              latitude: 23.10229
            }, {
              longitude: 113.3245220,
              latitude: 23.21229
            }],
            color: "#FF0000DD", // 设置颜色
            width: 2, // 设置线宽度 注：电脑模拟器无法预览测设设置，此设置需要手机测试
            dottedLine: true // 是否设置为虚线
        }],
        //初始化cityData为市级
        cityData: [
          { longitude: 113.280637, latitude: 23.125178, title: '广州市',number:0 },
          { longitude: 115.367432, latitude: 22.803191, title: '汕尾市',number:0 },
          { longitude: 116.680298, latitude: 23.365791, title: '汕头市',number:0 },
          { longitude: 116.625366, latitude: 23.662974, title: '潮州市',number:0 },
          { longitude: 116.378174, latitude: 23.562309, title: '揭阳市',number:0 },
          { longitude: 116.119995, latitude: 24.295372, title: '梅州市',number:0 },
          { longitude: 114.702759, latitude: 23.758534, title: '河源市',number:0 },
          { longitude: 114.417114, latitude: 23.118470, title: '惠州市',number:0 },
          { longitude: 113.757935, latitude: 23.027502, title: '东莞市',number:0 },
          { longitude: 114.065552, latitude: 22.556530, title: '深圳市',number:0 },
          { longitude: 113.582153, latitude: 22.277236, title: '珠海市',number:0 },
          { longitude: 113.389893, latitude: 22.526089, title: '中山市',number:0 },
          { longitude: 113.087769, latitude: 22.586964, title: '江门市',number:0 },
          { longitude: 113.120728, latitude: 23.023289, title: '佛山市',number:0 },
          { longitude: 113.060303, latitude: 23.678067, title: '清远市',number:0 },
          { longitude: 112.464294, latitude: 23.048565, title: '肇庆市',number:0 },
          { longitude: 112.041321, latitude: 22.917080, title: '云浮市',number:0 },
          { longitude: 111.983643, latitude: 21.868296, title: '阳江市',number:0 },
          { longitude: 110.928955, latitude: 21.674445, title: '茂名市',number:0 },
          { longitude: 110.357666, latitude: 21.275725, title: '湛江市',number:0 },
          { longitude: 113.598109, latitude: 24.810315, title: '韶关市',number:0 },
          { longitude: 113.385409, latitude: 22.938055, title: '番禺区',number:0 },
          // 添加更多市的经纬度数据
        ]
    },
  
    makerclick(e){
      // 这是一个事件，在wxml中绑定这个事件，点击浮标后
      //console.log(e.detail)
      const latitude = e.detail.latitude;
      const longitude = e.detail.longitude;
      let closestMarker = null;
      let minDistance = Infinity;
      this.data.markers.forEach(marker => {
        const distance = Math.abs(latitude-marker.latitude)
        if (distance < minDistance) {
          minDistance = distance;
          closestMarker = marker;
        }
      });
  
      wx.navigateTo({
        url: '/pages/detail-location/detail_location?latitude='+latitude+'&longitude='+longitude+'&city='+closestMarker.title
      });
    },
    //缩放到某个级别就把区的显示，恢复的时候就把市的显示
    dealScale(e){
      //console.log(e)
    },
    onLoad(options) {
        const { path, q } = options;
        //console.log(path);
        if (q) {
            const str = this.getQueryByUrl(decodeURIComponent(q));
            //console.log(str, str.page);
            wx.navigateTo({
                url: `/pages/${str.page}/${str.page}`,
            });
        }
        let that=this;
        //一上来就加载数据，获得各个城市的数量
        // 获取广东省各市的经纬度数据，然后更新cityData里面的number
        wx.request({
          url: 'http://120.78.1.231:8084/api/get/community/count',
          success(res) {
            //console.log("已经success");
            //console.log(res.data)
            //const cityData = that.data.cityData;
            const apiResponse =res.data;
          
            apiResponse.forEach(responseObj => {
              //console.log(responseObj)
              const [, cityName] = responseObj.city.split('广东省');
              const sum = responseObj.sum;
              that.data.cityData.forEach((cityObj, index) => {
                if (cityObj.title == cityName) {
                  let temp_str='cityData['+index+'].number';
                  that.setData({
                    [temp_str]:sum
                  });
                }
              });
            });
            // 根据经纬度数据生成标记点
          const markers = that.data.cityData.map(city => ({
            id: city.title,
            longitude: city.longitude,
            latitude: city.latitude,
            title: city.title,
            width: 3, 
            height: 10, 
            label: {
              content: `${city.title}\n${city.number}`,
              color: '#ffffff',
              bgColor: '#d17b7b',
              padding: 10, // 调整上下两部分内容的间距
              borderRadius: 5,
            }

          }));
          that.setData({ markers });
          },
          fail(error) {
            console.error('请求失败', error);
          }
        });
    },
    
    clickHandle(e) {
        let { name, path = '' } = e.detail.item;
        if (!path) {
            name = name.replace(/^[A-Z]/, (match) => `${match}`.toLocaleLowerCase());
            name = name.replace(/[A-Z]/g, (match) => {
                return `-${match.toLowerCase()}`;
            });
            path = `/pages/${name}/${name}`;
        }
        wx.navigateTo({
            url: path,
            fail: () => {
                wx.navigateTo({
                    url: '/pages/entry/navigateFail/navigateFail',
                });
            },
        });
    },

    onShareAppMessage() {
        return {
            title: '中山大学社会实践平台',
            path: '/pages/entry/entry',
        };
    },
    getQueryByUrl(url) {
        const data = {};
        const queryArr = `${url}`.match(/([^=&#?]+)=[^&#]+/g) || [];
        if (queryArr.length) {
            queryArr.forEach((para) => {
                const d = para.split('=');
                const val = decodeURIComponent(d[1]);
                if (data[d[0]] !== undefined) {
                    data[d[0]] += `,${val}`;
                }
                else {
                    data[d[0]] = val;
                }
            });
        }
        return data;
    },
    
});
