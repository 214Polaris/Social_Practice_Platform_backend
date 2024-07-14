Component({
  data:{
    // 这个到时候是要初始化的
    teamed_list:[],
    demand_list:[],
    team_list:[],
    proj_list:[],
    lab:['村镇需求','高校突击队','结对成功墙','示范项目'],
    //利用这三个去创建请求
    class:'村镇需求',
  },
  //一监听到1/3的任一数据的变化就触发新的请求
  methods: {
    onTabsChange(event) {
      this.setData({
        class:event.detail.label,
      });
    },

    onTabsClick(event) {
      // 更新数据,请求返回json后直接赋值给teamed_list
      //console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
      this.setData({
        class:event.detail.label
      });
      this.triggerEvent('changeTab', this.data.class);
    },
  //跳转结对详情页
  onClickTeamed(e)
  {
    //console.log(e.currentTarget.dataset);
    let type=e.currentTarget.dataset.class;
    let data=e.currentTarget.dataset.team;
    console.log(data)
    if(type==="高校突击队")
    {
      //跳转突击队详情
      let obj={
        team_id: data.team_id,
        team_title:data.team_title,
        tagList:data.tags
      }
      wx.navigateTo({
        url: '/pages/team-detail/team-detail?team='+JSON.stringify(obj),
      })
    }
    else if(type==="村镇需求")
    {
      //跳转需求详情
      let obj={
        demand_id: data.team_id,
        demand_name:data.team_title,
        tags:data.tags
      }
      wx.navigateTo({
        url: '/pages/demand-info/demand-info?demand='+JSON.stringify(obj),
      })
    }
    else if(type==="结对成功墙")
    {
      //跳转结对详情
      let obj={
        proj_id:data.team_id,
        demand_name:data.team_title
      }
      wx.navigateTo({
        url: '/pages/teamed-pro-detail/teamed-pro-detail?proj='+JSON.stringify(obj),
      })
    }
    else
    {
      //跳转成果详情
      wx.navigateTo({
        url: '/pages/result-detail/result-detail?id='+data.team_id+'&name='+data.team_title,
      })
    }
  },
  },
});
