// pages/team-detail/team-detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_name: 'xy666',
    team_id: '1', //传
    team_name: 'xxx学院xxx突击队',//传
    team_intro: 'balabalabalabala',
    team_cnt: '12',
    team_manager: 'xxx',
    team_teacher: 'xxx',
    team_phone: '189xxxxxxxx',
    imageSrc: '/pages/demand-info/temp_img/1.jpg', 
    tagList: ['xxx', 'yyy'], //传
    teamedList: [{
      proj_id: '1',
      proj_title: '送课进村小，助力乡村教育振兴',
      tags: ['xxx', 'yyy'],
      proj_gov: '乌石镇人民政府',
      proj_img: '/pages/demand-info/temp_img/1.jpg'
    }],
    visible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.team!=undefined)
    {
      let team=JSON.parse(options.team);
      console.log(team)
      this.setData({
        team_id:team.team_id,
        team_name:team.team_name,
        tagList:team.tagList==undefined?team.tags:team.tagList
      })
    }
    //服务器load所有数据
    wx.request({
      url: 'http://120.78.1.231:8084/api/team/detail?team_id=' + this.data.team_id,
      method: 'GET',
      header: {
        'token': wx.getStorageSync('token'),
        'Connection': 'Upgrade',
        'Upgrade': 'h2c'
      },
      success: (res) => {
        //console.log(res.data);
        const data = res.data;
        let teamedList = [];
        data.teamedList.forEach(function (team) {
          let obj = {
            proj_gov: team.proj_gov,
            proj_id: team.proj_id,
            proj_img: team.proj_img.replace(/[\r\n]/g, ''),
            proj_title: team.proj_title
          }
          teamedList.push(obj);
        })
        this.setData({
          team_cnt: data.member_cnt,
          team_manager: data.team_manager,
          team_teacher: data.team_teacher,
          teamedList: teamedList,
          team_phone: data.team_phone,
          team_intro: data.team_intro,
          imageSrc: data.team_avatar.replace(/['\r\n']/g, ''),
          team_name: data.team_name
        })
      }
    })
  },
  handlePopup(e) {
    this.setData({ visible: true });
  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    });
  },
  onClose() {
    this.setData({
      visible: false,
    });
  },
  onCopyNumber() {
    if (this.data.team_phone != null) {
      let that = this;
      wx.makePhoneCall({
        phoneNumber: this.data.team_phone,
        fail(err) {
          if (that.visible === true) {
            wx.showToast({
              title: '您已取消拨打电话',
              icon: 'none'
            })
          }
        }
      })
    }
    else {
      wx.showToast({
        title: '抱歉，该联系电话不合法',
        icon: 'none',
      })
    }
  },
  onClickTeamed(e) {

    //跳转结对详情页
    //console.log(e);
    let id = e.currentTarget.dataset.id;
    let obj = {
      proj_id: id,
      demand_name: e.currentTarget.dataset.demandname
    }
    wx.navigateTo({
      url: '/pages/teamed-pro-detail/teamed-pro-detail?proj=' + JSON.stringify(obj),
    })
  }
})