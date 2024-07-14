Component({
  data: {
    //到时候要初始化
    teamed_list: [],
    // 需要class,stag,location去获取请求,直接用搜索框的请求，把text变成stag即可
    // location: '广东省广州市海珠区',
    lab: ['社区经济发展', '社区团建工作', '社区社会调查', '社区文体活动', '社区教育服务', '社区环境治理'],
    class: '示范项目',
    stag1: 1,
    stag2: 1,
    taglist:[]
  },
  lifetimes:{
    created(){
      let that=this
      wx.request({
        url: 'http://120.78.1.231:8084/api/tags/all',
        success(res){
          //console.log(res.data.tags)
          that.setData({
            taglist:res.data.tags
          })
        }
      })
    }
  },
  methods: {
    findIdByName(name) {
      const tag = this.data.taglist.find(tag => tag.name === name);
      return tag ? tag.id : null;
    },
    // 点击选项卡的时候触发，也会触发二级的改变，触发页面请求
    onTabsClick(event) {
      //console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
      this.setData({
        class: event.detail.label,
      });
      this.triggerEvent('changeTab', this.data.class);
      if (this.data.class == "示范项目") {
        this.triggerEvent('changeSecond', this.data.stag1);
      } else {
        this.triggerEvent('changeSecond', this.data.stag2);
      }
    },
    //这里是二级标签被点击，触发请求，更新部分
    TabsClick(e) {
      if (this.data.class == '示范项目') {
        this.setData({
          stag1: this.findIdByName(e.detail.label),
        });
        //传示范项目和stag1
        //console.log(this.data.class, this.data.stag1);
        this.triggerEvent('changeSecond', this.data.stag1);
      } else {
        this.setData({
          stag2: this.findIdByName(e.detail.label)
        });
        //传结对成功墙和stag2
        //console.log(this.data.class, this.data.stag2);
        this.triggerEvent('changeSecond', this.data.stag2);
      }
    },
    onClickTeamed(e) {
      let team = e.currentTarget.dataset.proj;
      //跳转成果详情
      wx.navigateTo({
        url: '/pages/result-detail/result-detail?id=' + team.team_id + '&name=' + team.team_title,
      })
    },
    onClickProject(e) {
      //console.log(e.currentTarget.dataset)
      //结对成功墙
      //跳转结对详情
      let data=e.currentTarget.dataset.team;
      let obj={
        proj_id:data.team_id,
        demand_name:data.team_title
      }
      wx.navigateTo({
        url: '/pages/teamed-pro-detail/teamed-pro-detail?proj='+JSON.stringify(obj),
      })
    }
  },
});
