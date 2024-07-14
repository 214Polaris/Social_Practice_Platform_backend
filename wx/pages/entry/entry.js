import list from './data/index';
Page({
  data: {
    list,
    scrollTop: 20,
    sercherStorage: [],
    inputValue: "", //搜索框输入的值  
    StorageFlag: false, //显示搜索记录标志位
    content: ['近日加入：一六镇人民政府', '近日加入：唐家社区', '近日发布：“数字丰阳”三下乡团队'],//公告栏的内容
    team_name1: [
      '外国语队伍', '“数字丰阳”'
    ],//成功结对队伍1
    team_name2: [
      '斗山镇人民政府', '大良街道办事处'
    ],//成功结对队伍2
    teamNumber: 0,//结对成功数量
    //用location class stag请求
    location: '广东省湛江市',
    class: '村镇需求', //高校突击队，村镇需求
    stag: 1
  },
  onPageScroll: function (e) {
    var scrollTop = e.scrollTop; // 获取页面滚动的距离
    // 将scrollTop传递给setData方法，更新页面数据
    this.setData({
      scrollTop: scrollTop
    })
  },
  //地址切换的时候也要触发请求，更新页面内容
  onSetloc(e) {
    const selectedOptions = e.detail.selectedOptions;
    const labels = selectedOptions.map(option => option.label).join(''); // 提取每个元素的 label 属性值拼接
    this.setData({
      location: labels,
    });
    this.updateScollData();
  },
  // 实时更新数据,这里不用触发请求,因为此时updatestage也会触发
  Updateclass(e) {
    this.setData({
      class: e.detail,
    });
    // //console.log('class',this.data.class)
  },
  Updatestag(e) {
    this.setData({
      stag: e.detail,
    });
    // //console.log('stag',this.data.stag)
    //在这里和loc触发即可
    this.updateScollData();
  },
  updateScollData: function () {

    const scollOneComponent = this.selectComponent('#scoll');
    if (scollOneComponent) {
      scollOneComponent.setData({
        teamed_list: []
      });
      //console.log(this.data.class, this.data.stag)
      let that=this
      wx.request({
        url: 'http://120.78.1.231:8084/api/mainPage?category=' + this.data.class + '&tag_id=' + this.data.stag,
        success(res) {
          console.log(res.data)
          let list=res.data.map(item => {
            return {
              team_id: item.id,
              team_title: item.name,
              team_img: "data:image/png;base64," + item.image.replace(/[\r\n]/g, ''),
              team_name: item.list, 
              tags: item.tags
            };
          });
          //console.log(list);
          // 这里可以对返回的数据进行后续操作，比如渲染到页面上
          scollOneComponent.setData({
            teamed_list: list
          });
          //console.log("触发");
        },
        fail(error) {
          console.error('请求失败', error);
        }
      });
    }
  },
  onLoad(options) {
    const { path, q } = options;
    //console.log(path);
    if (q) {
      const str = this.getQueryByUrl(decodeURIComponent(q));
      //console.log(str, str.page);
      wx.navigateTo({
        url: `/pages/${str.page}/${str.page}`,
      });
    }
    //获取结对数量
    var that = this
    wx.request({
      url: 'http://120.78.1.231:8084/api/need/paired_number',
      success(res) {
        //console.log("请求成功")
        // 返回的内容为空的话执行replace会有问题
        //console.log(res.data.number);
        // 这里可以对返回的数据进行后续操作，比如渲染到页面上
        that.setData({
          teamNumber: res.data.number
        });
        //console.log("触发");
      },
      fail(error) {
        console.error('请求失败', error);
      }
    });
    this.updateScollData()
  },
  clickMap() {
    wx.navigateTo({
      url: '/pages/map-view/map',
    });
  },
  clickHandle(e) {
    let { name, path = '' } = e.detail.item;
    if (!path) {
      name = name.replace(/^[A-Z]/, (match) => `${match}`.toLocaleLowerCase());
      name = name.replace(/[A-Z]/g, (match) => {
        return `-${match.toLowerCase()}`;
      });
      path = `/pages/${name}/${name}`;
    }
    wx.navigateTo({
      url: path,
      fail: () => {
        wx.navigateTo({
          url: '/pages/home/navigateFail/navigateFail',
        });
      },
    });
  },
  onShareAppMessage() {
    return {
      title: '中山大学社会实践平台',
      path: '/pages/home/home',
    };
  },
  getQueryByUrl(url) {
    const data = {};
    const queryArr = `${url}`.match(/([^=&#?]+)=[^&#]+/g) || [];
    if (queryArr.length) {
      queryArr.forEach((para) => {
        const d = para.split('=');
        const val = decodeURIComponent(d[1]);
        if (data[d[0]] !== undefined) {
          data[d[0]] += `,${val}`;
        }
        else {
          data[d[0]] = val;
        }
      });
    }
    return data;
  },
  clickSuccess() {
    wx.redirectTo({
      url: '/pages/success-wall/wall',
    });
  },
  clickMy() {
    //改这里接个人主页
    const token = wx.getStorageSync('token')
    if (!token || token == '') {
      wx.redirectTo({
        url: '/pages/index/main',
      });
    } else {
      const uc = wx.getStorageSync('ide')
      if (uc === 'committee') {
        wx.redirectTo({
          url: `/pages/home/main?userName=${wx.getStorageSync('userName')}&Name=${wx.getStorageSync('Name')}&head=${wx.getStorageSync('head')}`
        })
      } else if (uc === 'community') {
        wx.redirectTo({
          url: `/pages/home_c/main?FirstLogin=0&Com=${wx.getStorageSync('Com')}&userName=${wx.getStorageSync('userName')}&Name=${wx.getStorageSync('Name')}&head=${wx.getStorageSync('head')}`
        })
      } else {
        wx.redirectTo({
          url: `/pages/home_sl/main?Team=${wx.getStorageSync('Team')}&userName=${wx.getStorageSync('userName')}&Name=${wx.getStorageSync('Name')}&Isleader=${wx.getStorageSync('Isleader')}&head=${wx.getStorageSync('head')}`
        })
      }
    }
  },
});
