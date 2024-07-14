// my_page/personinfo-view/changeinfo.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
      // 头像初始化是从那边前面传过来的 /assets/1.jpg
      image: '',
      //这几个信息的初始化是一开始请求的
      user_name:'',
      name:'',
      sex:'',
      phone:'13897997976',
      type1:'password',
      type2:'password',
      type3:'password',
      pw1:'',
      pw2:'',
      pw3:'',
      visible: false,
      text1:'显示',
      text2:'显示',
      text3:'显示'
    },
    close_page(){
      this.setData({
        visible:false,
      });
    },
    //设置密码的显示与隐藏
    transform1(){
      if(this.data.type1=='password'){
        this.setData({
          type1: 'text',
          text1: '隐藏'
        });
      }else{
        this.setData({
          type1: 'password',
          text1:'显示'
        });
      }
    },
    transform2(){
      if(this.data.type2=='password'){
        this.setData({
          type2: 'text',
          text2:'隐藏'
        });
      }else{
        this.setData({
          type2: 'password',
          text2:'显示'
        });
      }
    },
    transform3(){
      if(this.data.type3=='password'){
        this.setData({
          type3: 'text',
          text3:'隐藏'
        });
      }else{
        this.setData({
          type3: 'password',
          text3:'显示'
        });
      }
    },
    handlePopup(e) {
      this.setData(
        {
          pw1:'',
          pw2:'',
          pw3:''
        }
      );
      const { item } = e.currentTarget.dataset;

      this.setData(
        {
          cur: item,
        },
        () => {
          this.setData({ visible: true });
        },
      );
    },
    onVisibleChange(e) {
      this.setData({
        visible: e.detail.visible,
      });
    },
    //修改密码
    changepw(){
      
      //接口传递加密的密码，获取返回的内容然后弹出框显示结果
      //如果重复输入的密码对应不上的话就输出错误提醒
      if(this.data.pw2!=this.data.pw3){
        wx.showToast({
          title: '修改密码不一致，请重新输入',
          icon: 'error',
          duration: 1000  // 持续时间为2秒
        });
      }else if(this.data.pw1==''){
        wx.showToast({
          title: '请输入原密码',
          icon: 'error',
          duration: 1000  // 持续时间为2秒
        });
      }else{
        //发送请求
        var that=this;
        var utilMd5 = require('../../utils/md5');  
        var passwd = utilMd5.hexMD5(this.data.pw1); 
        var new_passwd=utilMd5.hexMD5(this.data.pw3);
        const token = wx.getStorageSync('token')
        wx.request({
          url: 'http://120.78.1.231:8084/api/modify/passwd',
          method: 'GET',
          data: {
            passwd: passwd,
            new_passwd: new_passwd
          },
          header: {
            'token':token
          },
          success (res) {
            //console.log(res.data)
            wx.showToast({
              title: '修改密码成功',
              icon: 'success',
              duration: 1000  // 持续时间为2秒
            });
            that.setData({
              visible: false
            });
          },
          fail (err) {
            //console.log(err)
          }
        })
      }
    },
    //实时获取各个输入框的密码
    input1(e){
      this.setData({
        pw1:e.detail.value
      });
    },
    input2(e){
      this.setData({
        pw2:e.detail.value
      });
    },
    input3(e){
      this.setData({
        pw3:e.detail.value
      });
    },

    image_click(){
      // 更换头像
      var that = this;
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        success(res) {
          // Navigate to a new page to display the selected image
          //console.log('跳转')
          wx.navigateTo({
            url: "/pages/image-crop/crop?imagePath="+ res.tempFiles[0].tempFilePath
          });
        }
      });
      
    },
    submit_click(){
      const sex = this.selectComponent('#sexInput').getValue();
      const phone = this.selectComponent('#phoneInput').getValue();
      this.setData({
        sex: sex,
        phone: phone
      });
      //console.log(this.data.name)
      var mobile = /^[1][3,4,5,7,8][0-9]{9}$/;
      var isMobile = mobile.exec(this.data.phone)
      //输入有误的话，弹出模态框提示
       if(!isMobile){
        wx.showToast({
          title: '电话输入格式不符合标准',
          icon: 'error',
          duration: 1000  // 持续时间为2秒
        });
      }else{
        //提交审核后要把信息传递给服务器
      const token = wx.getStorageSync('token')
      wx.request({
        url: 'http://120.78.1.231:8084/api/modify_info',
        method: 'POST',
        data: {
          //四个补全
          gender: this.data.sex,
          phone_number: this.data.phone
        },
        header: {
          'token':token
        },
        success (res) {
          //console.log(res.data)
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000  // 持续时间为2秒
          });
        },
        fail (err) {
          //console.log(err)
        }
      })
      }
      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      //页面一加载就请求个人信息
      //success里面的this已经发生了变化
      const token = wx.getStorageSync('token')
      let that=this;
      wx.request({
        url: 'http://120.78.1.231:8084/api/info',
        header: {
          'token':token
        },
        success(res) {
          //console.log("已经success");
          //console.log(res.data)
          that.setData({
            image: "data:image/png;base64," +res.data.image.replace(/[\r\n]/g, ''),
            name:res.data.name,
            phone:res.data.phone_number,
            sex:res.data.gender,
            user_name:res.data.username
          });
          //console.log("触发");
        },
        fail(error) {
          console.error('请求失败', error);
        }
      });
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