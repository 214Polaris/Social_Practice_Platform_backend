Component({
  data: {
    list: [
      { value: 'label_1', label: '文字', icon: 'home' },
      { value: 'label_2', label: '文字', icon: 'app' },
      { value: 'label_3', label: '文字', icon: 'chat' },
      { value: 'label_4', label: '文字', icon: 'user' },
    ],
  },
  methods: {
    clickSuccess(){
      wx.navigateTo({
        url: '/pages/success-wall/wall',
    });
    },
    clickMy(){
      //改这里接个人主页
      wx.navigateTo({
        url: '/my_page/modify-member/modify_member',
    });
    },
    // clickChat(){
    //   // 暂用一下，转到个人资料
    //   wx.navigateTo({
    //     url: '/my_page/personinfo-view/changeinfo',
    // });
    // }
  },

});
