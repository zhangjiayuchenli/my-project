import request from '../utils/request'

const globalService={
  delete(url, params) {
    return request.delete(url,params);
  },
  get(url) {
    return request.get(url);
  },
}
export default globalService;
