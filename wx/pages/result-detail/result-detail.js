let timer = null;
const debounceDelay = 300; // 防抖延迟时间，单位毫秒
Page({
  data: {
    user_name: 'xy666', //读缓存
    user_id: '1005', //读缓存
    avatar: '/pages/demand-info/temp_img/gov_head.png', //读缓存
    token: '',
    imageSrc: [],
    imgList: [],
    current: 0,
    demand_id: '1', //从前一个界面传
    demand_name: '送课进村小，助力乡村教育振兴', //从前一个界面传
    address: '湛江市麻江区xxx',
    date: '2024.05.12',
    res_intro: '',
    like: '点赞',
    comment: '1',
    comment_list: [],
    visible: false,
    focus: false,
    textarea: '',
    newcom: '',
    navigatorProps: {
      url: '/pages/comment-detail/comment-detail?demand_id='
    },
    unlike_flag: true,
    likeSend: false,
    duration: 60000,
    imgReq:[]
  },
  onLoad(options) {
    //get demandname demandid
    if (options.id != undefined) {
      this.setData({
        demand_id: options.id,
        demand_name: options.name
      })
    }
    this.setData({
      navigatorProps: {
        url: this.data.navigatorProps.url + this.data.demand_id
      }
    });
    //服务器load所有数据
    let that = this
    wx.request({
      url: 'http://120.78.1.231:8084/api/res/detail?demand_id=' + this.data.demand_id,
      method: 'GET',
      header: {
        'token': wx.getStorageSync('token'),
        'Connection': 'Upgrade',
        'Upgrade': 'h2c'
      },
      success: (res) => {
        const data = res.data;
        //console.log(data);
        let imglist = [];
        let imgSrc = [];
        let imgflagObj = null;

        for (let i = 0; i < data.imgList.length; i++) {
          let imgflag = data.imgList[i].img_flag;
          let obj = {};

          if (imgflag === 0) {
            obj = {
              src: data.imgList[i].src.replace(/[\r\n]/g, ''),
              img_flag: imgflag
            };
            imglist.push(obj.src);
          }
          else {
            obj = {
              src: 'http://120.78.1.231:8084/api/media/video/' + data.imgList[i].src + '?type=2&id=' + that.data.demand_id,
              img_flag: imgflag
            };
            imgSrc.push(obj)
          }
        }
        // //console.log(imgSrc)
        let comment_list = [];
        if (data.comment_list != undefined && data.comment_list.length > 0) {
          data.comment_list.forEach(function (comment) {
            let obj = {
              avatar: comment.avatar.replace(/[\r\n]/g, ''),
              content: comment.content,
              date: comment.date,
              user_name: comment.user_name
            };
            comment_list.push(obj);
          });
        }
        this.setData({
          address: data.address,
          comment: data.comment,
          comment_list: comment_list,
          imageSrc: imgSrc,
          imgReq: imglist,
          date: data.date,
          like: data.like,
          res_intro: data.res_intro,
          unlike_flag: data.unlike_flag
        });
        if(imgSrc.length===0)
          this.onImgReq();
      }
    });
  },
  onHandlePopup(e) {
    this.setData({
      visible: true,
      focus: true
    });
  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    });
  },
  getTime() {
    var date = new Date(); //获取当前时间
    var year = date.getFullYear(); //获取当前年份
    var month = date.getMonth() + 1; //获取当前月份
    var day = date.getDate(); //获取当前日期
    var hour = date.getHours(); //获取当前小时
    var minute = date.getMinutes(); //获取当前分钟
    var second = date.getSeconds();
    if (parseInt(month) < 10)
      month = '0' + month;
    if (parseInt(day) < 10)
      day = '0' + day;
    if (parseInt(hour) < 10)
      hour = '0' + hour;
    if (parseInt(minute) < 10)
      minute = '0' + minute;
    if (parseInt(second) < 10)
      second = '0' + second;
    var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return time;
  },
  onTextBlur(e) {
    this.setData({
      newcom: e.detail.value
    });
  },
  onHandleLike(e) {
    console.log(wx.getStorageSync('userName'))
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // 处理点赞
      this.setData({
        unlike_flag: !this.data.unlike_flag
      });
      if (this.data.unlike_flag === false) {
        if (this.data.like === '点赞') {
          this.setData({
            like: 1
          });
        } else {
          this.setData({
            like: parseInt(this.data.like) + 1
          });
        }
      } else {
        this.setData({
          like: parseInt(this.data.like) - 1 > 0 ? parseInt(this.data.like) - 1 : '点赞'
        });
      }

      var data = JSON.stringify({
        "user_id": this.data.user_id,
        "fruit_id": this.data.demand_id,
        "kudos_time": this.getTime(),
        "like": !this.data.unlike_flag
      });
      //console.log(data);
      wx.request({
        url: 'http://120.78.1.231:8084/api/res/update_like',
        method: 'POST',
        data: data,
        header: {
          'token': wx.getStorageSync('token'),
          'Connection': 'Upgrade',
          'Upgrade': 'h2c'
        },
        success: (res) => {
          //console.log(JSON.stringify(res.data));
        }
      });
    }, debounceDelay);
  },
  onSubmit() {
    //console.log(this.data.newcom);
    let newcom = [];
    newcom.push({
      user_name: wx.getStorageSync('userName'),
      avatar: wx.getStorageSync('head'),
      date: this.getTime(),
      content: this.data.newcom
    })
    newcom.push(this.data.comment_list[0]);
    //发布评论 情况newcom
    var data = JSON.stringify({
      "user_id": this.data.user_id,
      "fruit_id": this.data.demand_id,
      "comment_time": this.getTime(),
      "content": this.data.newcom
    });
    wx.request({
      url: 'http://120.78.1.231:8084/api/res/update_comment',
      method: 'POST',
      header: {
        'Connection': 'Upgrade',
        'Upgrade': 'h2c'
      },
      data: data,
      success: (res) => {
        this.setData({
          comment: parseInt(this.data.comment) + 1,
          newcom: '',
          comment_list: newcom
        })
      }
    });
    this.setData({
      visible: false,
    });
  },
  setDuration(e) {
    
    //处理时间格式并存放到data中
    this.setData({
      duration: 60000
    })
  },
  resetDuration(e) {
    this.onImgReq();
    this.setData({
      duration: 6000
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

      let newimglist=[];
      let orgSrc=this.data.imageSrc
      for(let i=0;i<orgSrc.length;i++)
      {
        if(orgSrc[i].img_flag===1)
          continue
        newimglist.push(orgSrc[i].src);
      }
      this.setData({
        imgList:newimglist
      })
  },

  // 封装一个获取图像数据的函数
  getImageData(imageId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `http://120.78.1.231:8084/api/media/get/image?image=${imageId}&id=${this.data.demand_id}&type=2`,
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
})