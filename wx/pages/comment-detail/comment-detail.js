// pages/comment-detail/comment-detail.js
Page({
  properties: {
    scrollTop: { type: Number, value: 0 },
  },
  /**
   * 页面的初始数据
   */
  data: {
    demand_id: '1',
    comment_no: 0,
    comment_list: [],
    stop: false
  },
  onToTop(e) {
    this.triggerEvent('to-top', e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.demand_id != undefined) {
      this.setData({
        demand_id: options.demand_id
      })
    }
    wx.request({
      url: 'http://120.78.1.231:8084/api/load_comment?demand_id=' + this.data.demand_id + '&time_stamp=' + this.getTime(),
      header: {
        'Connection': 'Upgrade',
        'Upgrade': 'h2c'
      },
      header: {
        'token': wx.getStorageSync('token')
      },
      success: (res) => {
        const data = res.data;
        let comlist = [];
        //console.log(data);
        if (data.length === 0) {
          this.setData({
            stop: true
          })
          return
        }
        for (let i = 0; i < data.length; i++) {
          let obj = {
            comment_no: data[i].comment_no,
            user_name: data[i].user_name,
            user_head: data[i].avatar.replace(/[\r\n]/g, ''),
            date: data[i].date,
            content: data[i].content
          }
          comlist.push(obj);
        }
        this.setData({
          comment_list: comlist,
          demand_id: options.demand_id == undefined ? '1' : options.demand_id,
          comment_no: this.data.comment_no + 5
        });
        this.onReachBottom();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  getTime() {
    var date = new Date(); //获取当前时间
    var year = date.getFullYear(); //获取当前年份
    var month = date.getMonth() + 1; //获取当前月份
    var day = date.getDate(); //获取当前日期
    var hour = date.getHours(); //获取当前小时
    var minute = date.getMinutes(); //获取当前分钟
    var second = date.getSeconds();
    if (parseInt(month) < 10)
      month = '0' + month;
    if (parseInt(day) < 10)
      day = '0' + day;
    if (parseInt(hour) < 10)
      hour = '0' + hour;
    if (parseInt(minute) < 10)
      minute = '0' + minute;
    if (parseInt(second) < 10)
      second = '0' + second;
    var time = year + '-' + month + '-' + day + '%20' + hour + ':' + minute + ':' + second;
    return time;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let time = this.data.comment_list[this.data.comment_list.length - 1].date;
    if (this.data.stop)
      return
    if (time != null) {
      wx.request({
        url: 'http://120.78.1.231:8084/api/load_comment?demand_id=' + this.data.demand_id + '&time_stamp=' + time,
        header: {
          'Connection': 'Upgrade',
          'Upgrade': 'h2c'
        },
        header: {
          'token': wx.getStorageSync('token')
        },
        success: (res) => {
          //console.log(res);
          const data = res.data;
          if (data.length === 0) {
            this.setData({
              stop: true
            })
            return
          }
          let comlist = this.data.comment_list;
          for (let i = 0; i < data.length; i++) {
            let obj = {
              comment_no: data[i].comment_no,
              user_name: data[i].user_name,
              user_head: data[i].avatar.replace(/[\r\n]/g, ''),
              date: data[i].date,
              content: data[i].content
            }
            comlist.push(obj);
          }
          this.setData({
            comment_list: comlist
          });
        }
      })
    }
  },
})