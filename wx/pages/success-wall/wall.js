// pages/success-wall/wall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: '广东省广州市海珠区',
    class: '示范项目',
    stag: 1,
    
  },
  //地址切换的时候也要触发请求，更新页面内容
  onSetloc(e) {
    const selectedOptions = e.detail.selectedOptions;
    const labels = selectedOptions.map(option => option.label).join(''); // 提取每个元素的 label 属性值拼接
    this.setData({
      location: labels,
    });
    this.updateScollData();
  },

  // 实时更新数据
  Updateclass(e) {
    this.setData({
      class: e.detail,
    });
    //console.log(this.data.class)
  },
  Updatestag(e) {
    this.setData({
      stag: e.detail,
    });
    //在这里和loc触发即可
    this.updateScollData();
  },
  updateScollData: function () {

    const scollOneComponent = this.selectComponent('#scoll');
    if (scollOneComponent) {
      scollOneComponent.setData({
        teamed_list: []
      });
      wx.request({
        url: 'http://120.78.1.231:8084/api/mainPage?category=' + this.data.class + '&tag_id=' + this.data.stag,
        header: {
          'Connection': 'Upgrade',
          'Upgrade': 'h2c'
        },
        success(res) {
          //console.log("请求成功")
          // 返回的内容为空的话执行replace会有问题
          const list = res.data.map(item => {
            return {
              team_id: item.id,
              team_title: item.name,
              team_img: "data:image/png;base64," + item.image.replace(/[\r\n]/g, ''),
              team_name: item.list,
              tags: item.tags
            };
          });
          //console.log(list);
          // 这里可以对返回的数据进行后续操作，比如渲染到页面上
          scollOneComponent.setData({
            teamed_list: list
          });
          //console.log("触发");
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
    this.updateScollData()
  },

  clickHome()
  {
    wx.redirectTo({
      url: '/pages/entry/entry',
    })
  },
  clickMy(){
    //改这里接个人主页
    const token = wx.getStorageSync('token')
    if(!token || token == '') {
      wx.redirectTo({
        url: '/pages/index/main',
      });
    } else {
      const uc = wx.getStorageSync('ide')
      if(uc === 'committee') {
        wx.redirectTo({
          url: `/pages/home/main?userName=${wx.getStorageSync('userName')}&Name=${wx.getStorageSync('Name')}&head=${wx.getStorageSync('head')}`
        })
      } else if(uc === 'community') {
        wx.redirectTo({
          url: `/pages/home_c/main?FirstLogin=0&Com=${wx.getStorageSync('Com')}&userName=${wx.getStorageSync('userName')}&Name=${wx.getStorageSync('Name')}&head=${wx.getStorageSync('head')}`
        })
      } else {
        wx.redirectTo({
          url: `/pages/home_sl/main?Team=${wx.getStorageSync('Team')}&userName=${wx.getStorageSync('userName')}&Name=${wx.getStorageSync('Name')}&Isleader=${wx.getStorageSync('Isleader')}&head=${wx.getStorageSync('head')}`
        })
      }
    }
  },
})