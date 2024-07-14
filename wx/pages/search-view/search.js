// pages/search-view/search.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
      //搜索图标被点击到时就将搜索文本以及location全部传入scoll-one
      text: "",
      location: "广东省广州市海珠区",
      label:"村镇需求"
    },
    onSetloc(e) {
      const selectedOptions = e.detail.selectedOptions;
      const labels = selectedOptions.map(option => option.label).join(''); // 提取每个元素的 label 属性值拼接
      this.setData({
        location: labels,
      });
      //console.log("触发", this.data.location);
    },
    //这个时候触发一次对scoll-one的内容的修改
    ChangeTab(e){
      this.setData({
        label:e.detail
      });
      this.updateScollOneData();
    },
    //这个时候也要触发对scoll-one内容的修改
    onSearch(e) {
      this.setData({
        // 如果传进来的只有一个量就没有必要加以区分
        text:e.detail
      });
      //console.log(this.data.text)
      // 发出请求，更新scoll-one的数据
      this.updateScollOneData();
    },
    //发送请求，更新scoll-one的数据
    updateScollOneData: function() {
      const scollOneComponent = this.selectComponent('#scoll-one');
      if (scollOneComponent) {
        scollOneComponent.setData({
          teamed_list: []
        });
        let that=this
        wx.request({
          url: 'http://120.78.1.231:8084/api/search',
          header: {
            'Connection': 'Upgrade',
            'Upgrade': 'h2c'
          },
          data: {
            location: this.data.location,
            text: this.data.text,
            label: this.data.label
          },
          success(res) {
            //console.log("已经success");
            //console.log(res.data)
            const list = res.data.map(item => {
              return {
                team_id: item.id,
                team_title: item.name,
                team_img: "data:image/png;base64," + item.image.replace(/[\r\n]/g, ''),
                team_name: item.list,
                tags: item.tags
              };
            });
            //console.log(that.data.label);
            // 这里可以对返回的数据进行后续操作，比如渲染到页面上
            if(that.data.label==='村镇需求')
            {
              scollOneComponent.setData({
                demand_list: list
              });
            }
            else if(that.data.label==='高校突击队')
            {
              scollOneComponent.setData({
                team_list: list
              });
            }
            else if(that.data.label==='结对成功墙')
            {
              scollOneComponent.setData({
                teamed_list: list
              });
            }
            else
            {
              scollOneComponent.setData({
                proj_list: list
              });
            }
            //console.log("触发");
            //console.log({location});
          },
          fail(error) {
            console.error('请求失败', error);
          }
        });
      }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      //实现加载页面的时候请求海珠区,乡镇需求的数据传给scoll-one组件
      this.updateScollOneData();
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