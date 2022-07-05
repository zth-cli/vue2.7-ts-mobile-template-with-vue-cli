/**
 * 将url上的参数提取为对象
 * @param baseUrl 需要提取的url,如果不传则为当前地址栏url
 * @returns {Object} 提取后的对象
 * 例子:
 *  let obj = {a: '3', b: '4'}
 *  www.baidu.com?a=3&b=4
 *  setObjToUrlParams('www.baidu.com')
 *  ==> {a: '3', b: '4'}
 */
export function getUrlParamsToObj(baseUrl?: string) {
  const url = baseUrl ? baseUrl : location.search
  const params = url.split('?')[1] //获取url中"?*"符后的字串
  const theRequest: { [x: string]: any } = {}
  if (params) {
    const strs = params.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
    }
  }
  return theRequest
}

/**
 * 将对象添加当作参数拼接到url上面
 * @param baseUrl 需要拼接的url
 * @param obj 参数对象
 * @returns {string} 拼接后的对象
 * 例子:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: Record<string, any>): string {
  let parameters = ''
  let url = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters
  }
  return url
}
// 获取浏览器内核版本
export function getBrowserVersion() {
  const ua = navigator.userAgent
  const tem = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  const tem2 = ua.match(/\((\d+),\d+\)/) || []
  return tem[2] ? tem[1] + ' ' + tem[2] : tem[1] || ''
}
