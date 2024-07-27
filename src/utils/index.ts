type TargetContext = '_self' | '_parent' | '_blank' | '_top';

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any }
) => {
  const { target = '_blank', ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(',')
  );
};

export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
);

/**
 * @description 格式化时间
 * @param time
 * @param cFormat
 * @returns {string|null}
 */
export function parseTime(time: string | number | Date, cFormat?: string) {
  if (arguments.length === 0) {
    return null;
  }
  if (time === '0') {
    return '';
  }
  if (time === 0) {
    return '';
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time, 10);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time *= 1000;
    }
    date = new Date(time);
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  return format.replace(
    /{([ymdhisa])+}/g,
    (result: string | any[], key: string) => {
      let value = formatObj[key];
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      if (result.length > 0 && value < 10) {
        value = `0${value}`;
      }
      return value || 0;
    }
  );
}

// 计算相差时间
export function timeFn (inTime: string | number, outTime: string | number) {
  if(!inTime || !outTime) return '-'
  //di作为一个变量传进来
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  var dateBegin = new Date(inTime); //将-转化为/，使用new Date
  var dateEnd = new Date(outTime); //获取当前时间
  var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000);
  // hours += dayDiff * 24;
  // console.log([dayDiff, hours, minutes, seconds]);
  if (dayDiff.toString() == "NaN") {
      return "-";
  } else {
      console.log(hours);
      return (
          dealWith(dayDiff) +
          "天" +
          dealWith(hours) +
          "时" +
          dealWith(minutes) +
          "分" +
          dealWith(seconds) +
          "秒"
      );
  }
}

function dealWith (nums: number) {
  if (nums < 10) {
      return "0" + nums;
  } else {
      return nums;
  }
};

/**
 * 将给定的 URL 转换为 Base64 字符串
 * @param {string} url 要转换的 URL
 * @returns {Promise<string>} 转换后的 Base64 字符串
 */
export function urlToBase64 (url: any) {
  return new Promise((resolve, reject) => {
    // 创建一个 XMLHttpRequest 对象
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    // 设置响应类型为 blob，以获取图像数据
    xhr.responseType = 'blob';
 
    // 请求成功时的处理函数
    xhr.onload = () => {
      // 创建一个 FileReader 对象，用于读取 blob 数据
      const reader = new FileReader();
      // 读取完成时的处理函数
      reader.onloadend = () => {
        // 将读取到的数据（Base64 字符串）传递给 resolve 函数
        resolve(reader.result);
      };
      // 读取失败时的处理函数
      reader.onerror = reject;
      // 将 blob 数据读取为 Base64 字符串
      reader.readAsDataURL(xhr.response);
    };
 
    // 请求失败时的处理函数
    xhr.onerror = reject;
    // 发送请求
    xhr.send();
  });
}

export default null;
