export function toFormatDateString(date) {
  //日期转换为标准格式 yyyy-MM-dd 字符串
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function toChineseDate(date) {
  //默认标准格式 yyyy-MM-dd
  var arr = date.split("-");
  arr = arr.map(function (element) {
    return delZeroFront(element);
  });
  return arr[0] + " 年 " + arr[1] + " 月 " + arr[2] + " 日";
}

export function delZeroFront(str) {
  var i = 0;
  while (i < str.length) {
    if (str.charAt(i) != "0") {
      break;
    }
    i++;
  }
  return str.substring(i);
}
