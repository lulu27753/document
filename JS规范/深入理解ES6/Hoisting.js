function getValue(condition) {
  if (condition) {
    var value = 'blue';
    // 其他代码
    console.log('value0 ' + value);
    return value;
  } else {
    // 此处可访问value,其值为undefined
    console.log('value1 ' + value);
  }
  // 此处可访问value,其值为undefined
  console.log('value2 ' + value);
}
// getValue()

// 变量提升后,相当于如下：
function getValue(condition) {
  var value;
  if (condition) {
    value = 'blue';
    // 其他代码
    console.log('value00 ' + value);
  } else {
    // 此处可访问value,其值为undefined
    console.log('value11 ' + value);
    // return null;
  }
  // 此处可访问value,其值为undefined
  console.log('value22 ' + value);
}
getValue(true)