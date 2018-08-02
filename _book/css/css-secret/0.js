// 检测某个样式属性是否被支持
function testProperty(property) {
  var root = document.documentElement;

  if (property in root.style) {
    root.classList.add(property.toLowerCase());
    return true;
  }

  root.classList.add('no-' + property.toLowerCase());
  return false;
}

// 检测某个具体的属性值是否支持
// 把属性值赋给对应的属性，然后再检查浏览器是不是还保存着这个值
// 由于会改变元素的样式，因此需要一个隐藏元素
function testValue(id, value, property) {
  var dummy = document.createElement('p');
  dummy.style[property] = value;

  if (dummy.style[property]) {
    root.classList.add(id);
    return true;
  }

  root.classList.add('no-' + id);
  return false;
}
