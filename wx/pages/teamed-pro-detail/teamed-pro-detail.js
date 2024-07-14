// pages/teamed-pro-detail/teamed-pro-detail.js
Page({
  data: {
    isRequestingImages:false,
    imageSrc: [],
    imgList: [],
    proj_id: 1, //传
    demand_name: '', //传
    tagList: [],//传
    address: '',
    team_cnt: 0,
    gov: '',
    gov_id: 1,
    gov_head: '/pages/demand-info/temp_img/gov_head.png',
    team: '', //传
    team_head: '/pages/demand-info/temp_img/gov_head.png',
    team_stu: '学生xxx',
    team_tea: '老师xxx',
    project_intro: '',
    activity_list: [],
    report_list: [],
    border: {
      color: 'var(--td-border-level-1-color, #d1d3d3)',
    },
    visible: false,
    duration: 60000,
    imgReq: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //console.log(options);
    if (options.proj != undefined) {
      let obj = JSON.parse(options.proj);
      this.setData({
        proj_id: obj.proj_id,
        demand_name: obj.demand_name
      })
    }
    let that = this
    wx.request({
      url: 'http://120.78.1.231:8084/api/project/detail?proj_id=' + this.data.proj_id,
      header: {
        'Connection': 'Upgrade',
        'Upgrade': 'h2c'
      },
      success(res) {
        const data = res.data;
        //console.log(data);
        let team_head = data.team_head.replace(/[\r\n]/g, '');
        let gov_head = data.gov_head.replace(/[\r\n]/g, '');
        let activity = [];
        for (let i = 0; i < data.activity_list.length; i++) {
          let obj = {
            date: data.activity_list[i].date,
            id: data.activity_list[i].id,
            img: data.activity_list[i].img.replace(/[\r\n]/g, ''),
            title: data.activity_list[i].title
          }
          activity.push(obj);
        }
        let imgSrc = [];
        let imglist = [];

        for (let i = 0; i < data.img_list.length; i++) {
          let imgflag = data.img_list[i].img_flag;
          let obj = {};

          if (imgflag === 0) {
            obj = {
              src: data.img_list[i].src,
              img_flag: imgflag
            };
            imglist.push(obj.src);
            // imgSrc.push(obj);
          }
          else {
            obj = {
              src: 'http://120.78.1.231:8084/api/media/video/' + data.img_list[i].src + '?type=1&id=' + that.data.proj_id,
              img_flag: imgflag
            };
            imgSrc.push(obj)
          }
        }

        that.setData({
          activity_list: activity,
          address: data.address,
          gov: data.gov,
          gov_head: gov_head,
          gov_id: data.gov_id,
          imageSrc: imgSrc,
          imgReq: imglist,
          project_intro: data.proj_intro,
          report_list: data.report_list,
          tagList: data.tag_list,
          team_cnt: data.team_cnt,
          team_head: team_head,
          team_stu: data.team_stu,
          team_tea: data.team_tea,
          team:data.team_name
        })
        if (imgSrc.length === 0)
          that.onImgReq();
      }
    })
  },
  onClickAct(e) {
    //console.log(e.currentTarget.dataset.result);
    let result = e.currentTarget.dataset.result;
    //跳转成果详情界面
    wx.navigateTo({
      url: '/pages/result-detail/result-detail?id=' + result.id + '&name=' + result.title,
    })
  },
  onClickArticle(event) {
    var link = event.currentTarget.dataset.link;
    wx.navigateTo({
      url: '/pages/article-link/article-link?link=' + link,
    })
  },
  onClickImg() {
    this.setData({
      visible: !this.data.visible
    })
  },
  resetDuration() {
    this.setData({
      duration: 60000
    })
  },
  setDuration() {
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
        //console.log(img)
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

    let newimglist = [];
    let orgSrc = this.data.imageSrc
    for (let i = 0; i < orgSrc.length; i++) {
      if (orgSrc[i].img_flag === 1)
        continue
      newimglist.push(orgSrc[i].src);
    }
    this.setData({
      imgList: newimglist
    })
  },

  // 封装一个获取图像数据的函数
  getImageData(imageId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `http://120.78.1.231:8084/api/media/get/image?image=${imageId}&id=${this.data.proj_id}&type=1`,
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