/**
 * @param  {String}  url
 * @param  {Boolean} isNoCaseSensitive 是否区分大小写
 * @return {Object}
 */
export const parseQuery = (url = window.location.search, isNoCaseSensitive) =>{
  let arr,
    part;

  const query = {};
  //去掉首位空格
  if (!(url || '').replace(/^\s+|\s+$/, '')) {
    return {};
  }

  url = url.replace(/\S*\?/, '');

  if (url) {

    if (isNoCaseSensitive) {
      url = url.toLocaleLowerCase();
    }

    arr = url.split('&');
    for (let i in arr) {
      part = arr[i].split('=');
      query[part[0]] = decodeURIComponent(part[1]);
    }
  }
  return query;
}

export const param = (paramObj) => {
  let str = [];
  for (let i in paramObj) {
    if (typeof paramObj[i] !== 'undefined') {
      str.push(i + '=' + encodeURIComponent(paramObj[i]));
    }
  }
  return str.join('&');
}

export const addParam = (url, params) => {
  let SEARCH_REG = /\?([^#]*)/,
    HASH_REG = /#(.*)/,
    searchStr;

  url = url || '';
  let search = {},
    searchMatch = url.match(SEARCH_REG);

  if (searchMatch) {
    search = parseQuery(searchMatch[0]);
  }

  //合并当前search参数
  search = Object.assign(search, params);

  searchStr = '?' + param(search);

  //是否存在search
  if (SEARCH_REG.test(url)) {
    url = url.replace(SEARCH_REG, searchStr);
  } else {
    //是否存在hash
    if (HASH_REG.test(url)) {
      url = url.replace(HASH_REG, searchStr + '#' + url.match(HASH_REG)[1]);
    } else {
      url += searchStr;
    }
  }
  return url;
}
