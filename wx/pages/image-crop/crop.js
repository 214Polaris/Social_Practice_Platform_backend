// my_page/image-crop/crop.js
// import WeCropper from '../../we-cropper/example/we-cropper/we-cropper'
// pages/weCoperStudy/weCoperStudy.js
 import WeCropper from '../../web-cropper/we-cropper/example/we-cropper/we-cropper'
 
const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const devicePixelRatio = device.pixelRatio
const height = device.windowHeight - 70
const fs = width / 750 * 2
 
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    imgSrc:'',//确定裁剪后的图片
    cropperOpt: {
      id: 'cropper',
      width: width, // 画布宽度
      height: height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: (width - 250) / 2, // 裁剪框x轴起点(width * fs * 0.128) / 2
        y: (height * 0.5 - 250 * 0.5), // 裁剪框y轴期起点
        width: 250, // 裁剪框宽度
        height: 250// 裁剪框高度
      }
    },
    imagePath:''//裁剪前的图片
  },
 
  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },
 
  cancelCrop() {
    //取消就是回到原位置
    this.cropper.pushOrign(this.data.imagePath)
  },
 
  getCropperImage() {
    //console.log("开始上传")
    // 如果有需要两层画布处理模糊，实际画的是放大的那个画布
    this.cropper.getCropperImage((src) => {
      if (src) {
        this.setData({
          imgSrc: src
        })
        //console.log(this.data.imgSrc)
        wx.showToast({
                             title: '上传中',
                             icon: 'loading',
                             duration: 20000
                         })
        // 发送post请求
        wx.uploadFile({
          url: 'http://120.78.1.231:8084/api/upload/avatar',
          filePath: this.data.imgSrc,
          name: 'img',
          header: {
            'Content-Type':'multipart/form-data',
            'token': wx.getStorageSync('token')
          },
          success: function (res) {
            //console.log(res)
            wx.hideToast()
            // 显示更换头像成功
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000  // 持续时间为2秒
            });
            //返回上一个页面
            setTimeout(() => {
              wx.navigateBack({
                delta: 1 // 返回上一个页面
              })
            }, 1000)
            const pages = getCurrentPages()
            const prevPage = pages[pages.length - 2]
            prevPage.setData({
              image: src
            })
            // // 当前页面的 JS 文件
            // getCurrentPages().find(page => page.route === '/my_page/personinfo-view/changeinfo.js').setData({
            //   image: img 
            // })
          }
        });
      } else {
        //console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imagePath: options.imagePath
    });
    //this.wecropper.pushOrign(this.data.imagePath)
    //console.log(this.data.imagePath)
    const { cropperOpt } = this.data
 
    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        //console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
    //刷新画面
    this.cropper.updateCanvas()
    this.cropper.pushOrign(this.data.imagePath)

  }
 
})
    
    

