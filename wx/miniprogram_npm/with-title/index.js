const data = {
  areaList: [
    {
      label: '广东省外',
      value: '110000',
      children: [
        {
          value: '110100',
          label: '全部',
          children: [
            { value: '110101', label: '全部' },
          ],
        },
      ],
    },
    {
      label: '广东省',
      value: '120000',
      children: [
        {
          value: '120100',
          label: '广州市',
          children: [
            { value: '120101', label: '荔湾区' },
            { value: '120102', label: '越秀区' },
            { value: '120103', label: '海珠区' },
            { value: '120104', label: '天河区' },
            { value: '120105', label: '白云区' },
            { value: '120106', label: '黄埔区' },
            { value: '120110', label: '番禺区' },
            { value: '120111', label: '花都区' },
            { value: '120112', label: '南沙区' },
            { value: '120113', label: '从化区' },
            { value: '120114', label: '增城区' },
          ],
        },
        {
          value: '120101',
          label: '韶关市',
          children: [
            { value: '120101', label: '武江区' },
            { value: '120102', label: '浈江区' },
            { value: '120103', label: '曲江区' },
            { value: '120104', label: '始兴县' },
            { value: '120105', label: '仁化县' },
            { value: '120106', label: '翁源县' },
            { value: '120110', label: '乳源瑶族自治区' },
            { value: '120111', label: '新丰县' },
            { value: '120112', label: '乐昌区' },
            { value: '120113', label: '南雄区' },
          ],
        },
        {
          value: '120102',
          label: '深圳市',
          children: [
            { value: '120101', label: '罗湖区' },
            { value: '120102', label: '福田区' },
            { value: '120103', label: '南山区' },
            { value: '120104', label: '宝安区' },
            { value: '120105', label: '龙岗区' },
            { value: '120106', label: '盐田区' },
            { value: '120110', label: '龙华区' },
            { value: '120111', label: '坪山区' },
            { value: '120112', label: '光明区' },
          ],
        },
        {
          value: '120103',
          label: '珠海市',
          children: [
            { value: '120101', label: '香洲区' },
            { value: '120102', label: '斗门区' },
            { value: '120103', label: '金湾区' },
          ],
        },
        {
          value: '120104',
          label: '汕头市',
          children: [
            { value: '120101', label: '龙湖区' },
            { value: '120102', label: '金平区' },
            { value: '120103', label: '濠江区' },
            { value: '120104', label: '潮阳区' },
            { value: '120105', label: '潮南区' },
            { value: '120106', label: '澄海区' },
            { value: '120110', label: '南澳县' },
          ],
        },
        {
          value: '120105',
          label: '佛山市',
          children: [
            { value: '120101', label: '南海区' },
            { value: '120102', label: '顺德区' },
            { value: '120103', label: '三水区' },
            { value: '120104', label: '高明区' },
          ],
        },
        {
          value: '120106',
          label: '江门市',
          children: [
            { value: '120101', label: '蓬江区' },
            { value: '120102', label: '江海区' },
            { value: '120103', label: '新会区' },
            { value: '120104', label: '台山区' },
          ],
        }
      ],
    }
  ],
};

Component({
  data: {
    options: data.areaList,
    note: '海珠区',
    visible: false,
    subTitles: ['请选择省份', '请选择城市', '请选择区/县'],
  },
  methods: {
    showCascader() {
      this.setData({ visible: true });
    },
    // e代表这个事件，包含一个selectedOptions的属性
    onChange(e) {
      const { selectedOptions } = e.detail;
      if(selectedOptions.length >= 3) {
        const thirdItemLabel = selectedOptions[2].label;
        this.setData({
          note: thirdItemLabel,
        });
      }
      this.triggerEvent('setlocation', {selectedOptions});
    },
  },
});
