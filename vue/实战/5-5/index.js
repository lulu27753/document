var app = new Vue ({
  el: '#app',
  data: {
    list: [
      {
      id: 1,
      name: 'iphone7',
      price: 6188,
      count: 1
      },
      {
      id: 2,
      name: 'ipd pro',
      price: 5888,
      count: 1
      },
      {
      id: 3,
      name: 'MacBook Pro',
      price: 21488,
      count: 1
      },
  ]
  },
  computed: {
    // 计算总价
    totalPrice: function () {
      var total = 0;
      for (let i = 0; i < this.list.length; i++) {
        const item = this.list[i];
        total += item.price * item.count;
      }
      return total;
    },
  },
  // 转换成千位分隔符
  filters: {
    format: function (value) {
      return value.toString().replace(/\B(?=(\d{3})+$)/g, ',')
    }
  },
  methods: {
    handleReduce: function (index) {
      // 在业务逻辑中再判断一次，避免因修改html模板后出现bug
      if (this.list[index].count === 1) {
        return;
      }
      this.list[index].count--;
    },
    handleAdd: function (index) {
      this.list[index].count++;
    },
    handleRemove: function (index) {
      this.list.splice(index, 1);
    }
  }
})