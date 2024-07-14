// my_page/choose-location/choose_location.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      //打开这个页面的中心点的经纬度
      latitude:0,
      longitude:0,
      city:'',
      pointData: [
        // 添加更多市的经纬度数据
      ],
      markers:[
      ]
    },
    makerClick(e){
      let latitude=e.detail.latitude
      let longitude=e.detail.longitude
      let closestMarker = null;
      let minDistance = Infinity;
      this.data.pointData.forEach(obj => {
        const distance = Math.abs(latitude-obj.latitude)
        if (distance < minDistance) {
          minDistance = distance;
          closestMarker = obj;
        }
      });
      wx.openLocation({
        latitude:latitude,
        longitude:longitude,
        address:closestMarker.address
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    
    onLoad(options) {
      this.setData({
        latitude: options.latitude,
        longitude:options.longitude,
        city:options.city
      });
      const city=this.data.city
      let that=this
      //根据city去发送请求然后修改pointData
      wx.request({
        url: 'http://120.78.1.231:8084/api/get/coordinate?city='+city,
        success(res) {
          //console.log("请求成功")
          that.setData({
            pointData: res.data.map(item => ({
              longitude: item.longitude,
              latitude: item.latitude,
              address:item.address
            }))
          });
          //console.log(res.data)
          //console.log(that.data.pointData)
          //要写在这否则会先执行同步的，外面的还没根据请求更新marker
          const markers = that.data.pointData.map(city => ({
            longitude: city.longitude,
            latitude: city.latitude,
          }));
          that.setData({ markers });
        },
        fail(error) {
          console.error('请求失败', error);
        }
      });  
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})