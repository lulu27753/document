Vue.component('input-number', {
  template: '\
    <div class="input-number">\
      <input type = "text" : value = "currentValue" @change = "handleChange" >\
      <button @click="handleDown" :disabled="currentValue <= min">-</button>\
      <button @click="handleUp" :disabled="currentValue >= min">+</button>\
    </div>',
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: Number,
      default: 0
    },
  },
  data: function () {
    return {
      currentValue: this.value,
    }
  },
  methods: {
    updateValue: function (val) {
      
    }
  }

})