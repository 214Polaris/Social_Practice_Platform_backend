// pages/team-list/team-list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    demand_list: [{
      demand_id: '1',
      demand_img: '/pages/demand-info/temp_img/gov_head.png',
      demand_name: '送课进村小',
      tags: ['绿美广东', '乡村公共服务'],
      demand_gov: '白石村社区服务站',
      demand_time: '2023-05-23 12:59:12',
      demand_locat: '白石村'
    },
    ],
    stopReq: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    wx.request({
      url: 'http://120.78.1.231:8084/api/need/unpaired?need_no',
      header: {
        'Connection': 'Upgrade',
        'Upgrade': 'h2c'
      },
      success(res) {
        // //console.log(res.data);
        const demand = res.data.demand_list;
        let demandList = [];
        for (let i = 0; i < demand.length; i++) {
          let obj = {
            demand_id: demand[i].demand_id,
            demand_img: demand[i].demand_img.replace(/[\r\n]/g, ''),
            demand_name: demand[i].demand_title,
            demand_time: demand[i].demand_time,
            demand_locat: demand[i].demand_locat,
            demand_gov: demand[i].demand_gov,
            tags: demand[i].tagList
          }
          demandList.push(obj);
        }
        that.setData({
          demand_list: demandList
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.stopReq)
      return
    let that = this
    wx.request({
      url: 'http://120.78.1.231:8084/api/need/unpaired?need_no=' + that.data.demand_list[that.data.demand_list.length - 1].demand_id,
      header: {
        'Connection': 'Upgrade',
        'Upgrade': 'h2c'
      },
      success(res) {
        // //console.log(res.data);
        const demand = res.data.demand_list;
        let demandList = that.data.demand_list;
        if (demand.length < 5)
          that.setData({
            stopReq: true
          })
        for (let i = 0; i < demand.length; i++) {
          let obj = {
            demand_id: demand[i].demand_id,
            demand_img: demand[i].demand_img.replace(/[\r\n]/g, ''),
            demand_name: demand[i].demand_title,
            demand_time: demand[i].demand_time,
            demand_locat: demand[i].demand_locat,
            demand_gov: demand[i].demand_gov,
            tags: demand[i].tagList
          }
          demandList.push(obj);
        }
        that.setData({
          demand_list: demandList
        })
        // //console.log(that.data.demand_list)
      }
    })
  },
  onClickDemand(e) {
    // //console.log(e.currentTarget.dataset.demand);
    let demand = e.currentTarget.dataset.demand;
    let obj = {
      demand_id: demand.demand_id,
      demand_name: demand.demand_name,
      tags: demand.tags
    }
    wx.navigateTo({
      url: '/pages/demand-pair/demand-pair?demand=' + JSON.stringify(obj),
    })
  },
  onSearchReq(e) {
    let that=this
    wx.request({
      url: 'http://120.78.1.231:8084/api/search/unpaired?keyword=' + e.detail.value,
      header: {
        'Connection': 'Upgrade',
        'Upgrade': 'h2c'
      },
      success(res) {
        if (res.statusCode === 200) {
          const demand = res.data.demand_list;
          let demandList = [];
          if (demand.length < 5)
            that.setData({
              stopReq: true
            })
          for (let i = 0; i < demand.length; i++) {
            let obj = {
              demand_id: demand[i].demand_id,
              demand_img: demand[i].demand_img.replace(/[\r\n]/g, ''),
              demand_name: demand[i].demand_title,
              demand_time: demand[i].demand_time,
              demand_locat: demand[i].demand_locat,
              demand_gov: demand[i].demand_gov,
              tags: demand[i].tagList
            }
            demandList.push(obj);
          }
          that.setData({
            demand_list: demandList
          })
        }
      }
    })
  }
})