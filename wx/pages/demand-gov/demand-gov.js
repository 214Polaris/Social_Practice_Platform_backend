Page({
  data: {
    gov_id: '1',
    gov_head: '/pages/demand-info/temp_img/gov_head.png',
    gov_name: '乌石镇人民政府',
    demand_list: [],
    post_list: [],
    post_visible: false,
    teamed_list: [],
    post_req_stop: false
  },
  onLoad: function (options) {
    if (options.id != undefined) {
      this.setData({
        gov_head: options.img,
        gov_name: options.name,
        gov_id: options.id
      })
    }
    let that = this
    wx.request({
      url: 'http://120.78.1.231:8084/api/community/need_list?gov_id=' + this.data.gov_id,
      header: {
        'Connection': 'Upgrade',
        'Upgrade': 'h2c'
      },
      success(res) {
        //console.log(res.data);
        const data = res.data;
        let demandlist = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {
            demand_id: data[i].demand_id,
            demand_img: data[i].demand_img.replace(/[\r\n]/g, ''),
            demand_name: data[i].demand_name,
            tags: data[i].tags
          }
          demandlist.push(obj);
        }
        that.setData({
          demand_list: demandlist
        })
      }
    })
    this.onRequestResult();
  },
  onRequestResult() {
    if (this.data.post_req_stop)
      return
    let that = this
    let res_no = ''
    if (this.data.post_list.length != 0)
      res_no = parseInt(this.data.post_list[this.data.post_list.length - 1].post_id) + 1
    //console.log(res_no)
    wx.request({
      url: 'http://120.78.1.231:8084/api/community/moment?gov_id=' + this.data.gov_id + '&res_no=' + res_no,
      header: {
        'Connection': 'Upgrade',
        'Upgrade': 'h2c'
      },
      success(res) {
        //console.log(res.data);

        const data2 = res.data;
        let postlist = that.data.post_list;
        if (postlist.length < 2)
          that.setData({
            post_req_stop: true
          })
        for (let i = 0; i < data2.length; i++) {
          let imglist = [];
          for (let j = 0; j < data2[i].post_img.length; j++) {
            imglist.push(data2[i].post_img[j].replace(/[\r\n]/g, ''));
          }
          let obj = {
            post_content: data2[i].post_content,
            post_id: data2[i].post_id,
            post_img: imglist,
            post_location: data2[i].post_location,
            post_time: data2[i].post_time,
            post_title: data2[i].post_title,
            team_avatar: data2[i].team_avatar.replace(/[\r\n]/g, ''),
            team_name: data2[i].team_name
          }
          postlist.push(obj);
        }
        //console.log(postlist);
        that.setData({
          post_list: postlist
        })
      }
    })
  },
  onTabsChange(event) {
    if (event.detail.value == 1) {
      if (this.data.post_list.length < 2)
        return;
      this.onRequestResult();
    }
    else if (event.detail.value == 2) {
      let that = this
      wx.request({
        url: 'http://120.78.1.231:8084/api/community/project_list?gov_id=' + this.data.gov_id,
        header: {
          'Connection': 'Upgrade',
          'Upgrade': 'h2c'
        },
        success(res) {
          //console.log(res.data);
          const data3 = res.data.proj_list
          let proj_list = []
          for (let i = 0; i < data3.length; i++) {
            let obj = {
              team_id: data3[i].proj_id,
              team_img: data3[i].proj_img.replace(/[\r\n]/g, ''),
              team_title: data3[i].proj_title,
              tags: data3[i].tags,
              team_name: data3[i].team_name
            }
            proj_list.push(obj)
          }
          that.setData({
            teamed_list: proj_list
          })
        }
      })
    }
  },

  onTabsClick(event) {
    switch (event.detail.value) {
      case "0":
        //console.log("000");
        //服务器读取需求清单
        break;
      case "1":
        //console.log("111");
        //服务器读取结对动态
        break;
      case "2":
        //console.log("222");
        //服务器读取结对项目
        break;
    }
  },
  onClickDemand(e) {
    //console.log(e.currentTarget.dataset);
    let demand = e.currentTarget.dataset.demand;
    let obj = {
      demand_id: demand.demand_id,
      demand_name: demand.demand_name,
      tags: demand.tags
    }
    //跳转需求详情页
    wx.navigateTo({
      url: '/pages/demand-info/demand-info?demand=' + JSON.stringify(obj),
    })
  },
  onClickResult(e) {
    //跳转成果详情页
    //console.log(e.currentTarget.dataset.post);
    let post = e.currentTarget.dataset.post;
    wx.navigateTo({
      url: '/pages/result-detail/result-detail?id=' + post.post_id + '&name=' + post.post_title,
    })
  },
  onClickTeamed(e) {
    //跳转结对详情页
    //console.log(e.currentTarget.dataset.proj);
    let proj = e.currentTarget.dataset.proj;
    let obj = {
      proj_id: proj.team_id,
      demand_name: proj.team_title
    }
    wx.navigateTo({
      url: '/pages/teamed-pro-detail/teamed-pro-detail?proj=' + JSON.stringify(obj),
    })
  },
  onClick() {
    this.setData({
      post_visible: true,
    })
  },
  onClose(e) {
    this.setData({
      post_visible: false,
    });
  },
})