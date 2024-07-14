Component({
  data: {
    //到时候要初始化
    teamed_list: [],
    // 需要class,stag,location去获取请求,直接用搜索框的请求，把text变成stag即可
    // location: '广东省广州市海珠区',
    class: '村镇需求',
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
          that.setData({
            taglist:res.data.tags
          })
        }
      })
    }
  },
  methods: {
    // 点击选项卡的时候触发，触发页面请求
    onTabsClick(event) {
      // //console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
      this.setData({
        class: event.detail.label,
      });
      this.triggerEvent('changeTab', this.data.class);
      if (this.data.class == "村镇需求") {
        this.triggerEvent('changeSecond', this.data.stag1);
      } else {
        this.triggerEvent('changeSecond', this.data.stag2);
      }
    },
    findIdByName(name) {
      const tag = this.data.taglist.find(tag => tag.name === name);
      return tag ? tag.id : null;
    },
    //这里是二级标签被点击，触发请求，更新部分
    TabsClick(e) {
      if (this.data.class == '村镇需求') {
        this.setData({
          stag1: this.findIdByName(e.detail.label),
        });
        //传村镇需求和stag1
        this.triggerEvent('changeSecond', this.data.stag1);
      } else {
        this.setData({
          stag2: this.findIdByName(e.detail.label)
        });
        //传高校突击队和stag2
        this.triggerEvent('changeSecond', this.data.stag2);
      }
    },
    onClickDemand(e) {
      let demand = e.currentTarget.dataset.demand;
      let obj = {
        demand_id: demand.team_id,
        demand_name: demand.team_title,
        tags: demand.tags
      }
      //跳转需求详情页
      wx.navigateTo({
        url: '/pages/demand-info/demand-info?demand=' + JSON.stringify(obj),
      })
    },
    onClickTeam(e)
    {
      let team = e.currentTarget.dataset.team;
      let obj = {
        team_id: team.team_id,
        team_name: team.team_name.first_name,
        tags: team.tags
      }
      //跳转需求详情页
      wx.navigateTo({
        url: '/pages/team-detail/team-detail?team=' + JSON.stringify(obj),
      })
    }
  },
});
