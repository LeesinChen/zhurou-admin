let api_host = 'http://localhost:3300';

const host = window.location.host


export default {
  login: `${api_host}/api/login`,
  goods_list: `${api_host}/api/queryGoods`,
  detail_goods: `${api_host}/api/detailGoods`,
  create_goods: `${api_host}/api/createGoods`,
  delete_goods: `${api_host}/api/deleteGoods`,
}

