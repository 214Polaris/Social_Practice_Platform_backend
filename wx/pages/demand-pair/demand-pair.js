Page({
  data: {
    visible: false,
    imageSrc: [],
    imgList: [],
    imgReq: [],
    demand_id: 1, // 传
    demand_name: '送课进村小，助力乡村教育振兴', //传
    tagList: ['xxx', 'yyy'], //传
    address: '湛江市麻江区xxx',
    gov_id: '1',//传
    gov: '双华镇人民政府',//传
    gov_manager: '卢小姐',
    gov_phone: '189xxxxxxxx',
    gov_head: '/pages/demand-info/temp_img/gov_head.png',
    demand_intro: '',
    Imgvisible: false,
    duration: "60000",
    showConfirm: false,
    isRequestingImages: false
  },
  onLoad(options) {
    //get demandid demandname taglist
    if (options.demand != undefined) {
      let obj = JSON.parse(options.demand);
      this.setData({
        demand_id: obj.demand_id,
        demand_name: obj.demand_name,
        tagList: obj.tags
      })
    }
    //get demand
    let that = this
    wx.request({
      url: 'http://120.78.1.231:8084/api/need/detail?need_id=' + this.data.demand_id,
      header: {
        'Connection': 'Upgrade',
        'Upgrade': 'h2c'
      },
      success(res) {
        //console.log(res.data);
        const data = res.data;
        let avatar = data.gov_avatar.replace(/[\r\n]/g, '');
        let imgSrc = [];
        let imglist = [];

        for (let i = 0; i < data.imgList.length; i++) {
          let imgflag = data.imgList[i].img_flag;
          let obj = {};

          if (imgflag === 0) {
            obj = {
              src: data.imgList[i].src.replace(/[\r\n]/g, ''),
              img_flag: imgflag
            };
            imglist.push(obj.src);
            // imgSrc.push(obj);
          }
          else {
            obj = {
              src: 'http://120.78.1.231:8084/api/media/video/' + data.imgList[i].src + '?type=1&id=' + that.data.demand_id,
              img_flag: imgflag
            };
            imgSrc.push(obj);
          }
        }

        that.setData({
          imageSrc: imgSrc,
          imgReq: imglist,
          address: data.address,
          gov: data.gov,
          gov_head: avatar,
          gov_id: data.gov_id,
          gov_manager: data.gov_manager,
          gov_phone: data.gov_phone,
          demand_intro: data.demand_intro
        })
        if(imgSrc.length===0)
          that.onImgReq()
      },
      fail(res) {
        wx.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 获取视频时长
  getLength(e) {
    //处理时间格式并存放到data中
    this.setData({
      duration: 60000
    })
  },
  resetInterval(e) {
    this.onImgReq();
    this.setData({
      duration: 6000
    })
  },
  onShareAppMessage: function () {
    return {
      title: this.data.demand_name,
      path: '/pages/demand-info/demand-info?demand-id=' + this.data.demand_id
    }
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
  onGovClickHandle() {
    wx.navigateTo({
      url: '/pages/demand-gov/demand-gov?img=' + this.data.gov_head + '&name=' + this.data.gov + '&id=' + this.data.gov_id
    });
  },
  onClickImg(e) {
    this.setData({
      Imgvisible: !this.data.Imgvisible
    })
  },
  onPhoneCall(e) {
    let that = this
    wx.makePhoneCall({
      phoneNumber: this.data.gov_phone,
      fail: err => {
        if (that.visible === true) {
          wx.showToast({
            title: '您已取消拨打电话',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  handlePair() {
    //console.log('pair');
    this.setData({
      showConfirm: true
    })
  },
  onReqPair() {
    wx.request({
      url: 'http://120.78.1.231:8084/api/need/pair?demand_id=' + this.data.demand_id,
      method: 'POST',
      header: {
        'token': wx.getStorageSync('token'),
        'Connection': 'Upgrade',
        'Upgrade': 'h2c'
      },
      success(res) {
        //console.log(res)
        if(res.statusCode==200)
        {
          wx.showToast({
            title: '已发送请求',
            icon: 'success'
          })
        }
        else
        {
          wx.showToast({
            title: res.data,
            icon:'none'
          })
        }
      },
      fail(res){
        //console.log(res)
        wx.showToast({
          title: res,
          icon: 'none'
        })
      }
    })
    this.setData({
      showConfirm: false
    })
  },
  onCloseDialog() {
    this.setData({
      showConfirm: false
    })
  },
  onImgReq() {
    if (this.data.isRequestingImages) return;
    this.setData({ isRequestingImages: true });

    let imgReq = this.data.imgReq;
    if (imgReq.length <= 0) {
      this.setData({ isRequestingImages: false });
      return;
    }

    let img = this.data.imageSrc;
    //console.log(img);

    // 创建一个 Promise 数组
    const promises = imgReq.map(item => this.getImageData(item));

    // 使用 Promise.all() 等待所有请求完成
    Promise.all(promises)
      .then(results => {
        // 将所有请求结果合并到 img 数组中
        img = img.concat(results);
        this.setData({
          imageSrc: img,
          imgReq: []
        });
        this.setData({ isRequestingImages: false });
      })
      .catch(error => {
        console.error('Error fetching image data:', error);
        this.setData({ isRequestingImages: false });
      });
  },

  // 封装一个获取图像数据的函数
  getImageData(imageId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `http://120.78.1.231:8084/api/media/get/image?image=${imageId}&id=${this.data.demand_id}&type=1`,
        header: {
          'Connection': 'Upgrade',
          'Upgrade': 'h2c'
        },
        success: res => {
          resolve({
            src: res.data.replace(/[\r\n]/g, ''),
            img_flag: 0
          });
        },
        fail: res => {
          wx.showToast({
            title: res.data,
            icon: 'none'
          })
        }
      });
    });
  }
});
