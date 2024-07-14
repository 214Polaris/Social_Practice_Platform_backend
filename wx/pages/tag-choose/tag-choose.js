// pages/tag-choose/tag-choose.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: [],
    choose: [],
    visible: false,
    chosenTagId:[], //选择的tagID
    chosenTagName:[] //选择的tag名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchClassiData()
  },
  fetchClassiData() {
    wx.request({
      url: 'http://120.78.1.231:8084/api/tags/all',
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          //console.log('数据获取成功:', res.data)
          let tags=res.data.tags
          let opList=this.data.choose
          for(let i=0;i<tags.length;i++)
          {
            let obj={
              label:tags[i].name,
              value:tags[i].id+'',
              isChecked:false
            }
            opList.push(obj);
          }
          this.setData({
            choose:opList
          })
        }
      },
      fail: error => {
        console.error('请求失败:', error)
      }
    })
  },
  onVisibleChange()
  {
    this.setData({
      visible:!this.data.visible
    })
    if(this.data.visible===false)
      this.onCancelSelect();
  },
  handlePopup(e) {
    this.onVisibleChange()
  },
  handleGroupChange(event) {
    let value=event.detail.value
    if(value.length>3)
    {
      wx.showToast({
        title: '您选择的类别数量已到达上限！',
        icon: 'none'
      })
      
    }
    this.setData({
      current: event.detail.value,
    });   

  },
  onCancelSelect()
  {
    this.setData({
      current: [],
      visible:false
    })
  },
  onConfirmSelect()
  {
    if(this.data.current.length>3)
    {
      wx.showToast({
        title: '您选择的类别过多！',
        icon:'none'
      })
    }
    else
    {
      let result = [];
      let current=this.data.current;
      let choose=this.data.choose
      for(let i=0;i<current.length;i++)
      {
        for(let j=0;j<choose.length;j++)
        {
          if(current[i]==choose[j].value)
          {
            result.push(choose[j].label);
            break
          }  
        }
      }
      //console.log(result);
      this.setData({
        visible:false,
        chosenTagId:this.data.current,
        current:[]
      })
    }
  }
})