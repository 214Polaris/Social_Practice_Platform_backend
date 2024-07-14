// pages/contact-us/contact-us.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      mail:'chenjw339@mail2.sysu.edu.cn',
      phone:'155 0766 2529'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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

    onPhoneCall(e)
    {
      wx.makePhoneCall({
        phoneNumber: this.data.phone,
      })
    },

    onCopyMail()
    {
      wx.setClipboardData({
        data: this.data.mail,
      })
    },
    onCopyWechat()
    {
      wx.setClipboardData({
        data: this.data.phone.replace(/[' ']/g,''),
      })
    }
})