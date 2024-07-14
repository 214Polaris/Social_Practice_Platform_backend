Component({
  data: {
    value: '',
  },

  methods: {
    onChange({ detail }) {
      // //console.log(`modelValue: ${detail.value}`);
      wx.navigateTo({
        url: '/pages/search-view/search',
    });
    },
  },
});
