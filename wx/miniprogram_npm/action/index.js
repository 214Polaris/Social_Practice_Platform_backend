Component({
  data: {
    value: '',
    actionText: '',
    searchRecords: [],
    iffocus: false,
    StorageFlag:true,
  },

  methods: {
    // 点击搜索icon时才添加搜索记录，这里要设置搜索的反应
    setSearch(){
    //这里监测到icon点击将value传出去
    this.triggerEvent('search', this.data.value);
    // 添加搜索记录的逻辑,直接用value是没用的
    //其他地方是因为value是临时变量记录e.detail传过来的值
    if(this.data.StorageFlag){
      this.addSearchRecord(this.data.value);
    }
    this.data.StorageFlag=true;
    // this.setData({
    //   value: '',
    // });
    },
    //输入的值变化时更新value
    changeHandle(e) {
      const { value } = e.detail;
      this.setData({
        value: value,
      });
    },
    //输入框获取焦点时显示取消按钮
    focusHandle() {
      this.setData({
        actionText: '取消',
        iffocus: true,
      });
    },
    //输入框失去焦点时隐藏取消按钮
    blurHandle() {
      this.setData({
        actionText: '',
        iffocus:false,
      });
    },
    //点击取消按钮时重置
    actionHandle() {
      this.setData({
        value: '',
        actionText: '',
      });
    },
    // 清空历史记录
    clearSearchStorage: function () {
      this.setData({ searchRecords: [],
      })
   },
    //点击已有历史记录时将其显示在搜索框，设置value
    tapSearchStorage(e)
    {
      //将所选的记录显示在搜索框里
      this.setData({
          value: e.currentTarget.dataset.item,
          StorageFlag: false, 
      })
    },
    addSearchRecord(value) {
      const { searchRecords } = this.data;
      // 去除重复的搜索记录
      if (searchRecords.includes(value)) {
        this.setData({ searchRecords: [value, ...searchRecords.filter(item => item !== value)] });
      } else {
        this.setData({ searchRecords: [value, ...searchRecords].slice(0, 5) }); // 限制最多记录数
      }
    },
  },
});
