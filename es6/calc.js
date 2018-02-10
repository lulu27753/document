
  class Calc {
    constructor() {
      console.log('Calc constructor');
    }
    add(a, b) {
      return a + b;
    }
  }
//size必须声明但是可以是 undefined 或 null
  var c = new Calc();
  console.log(c.add(4,5));
  let size
 const sizeCls = ({
      large: 'lg',
      small: 'sm',
    })[size];
 console.log(sizeCls)

 

