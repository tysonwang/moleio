export default class initConfig {
    constructor() {
      return {
        url: '',
        method: 'GET',
        baseURL: '',
  
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {},
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'brackets' })
        },
        data: {},
        timeout: 1000,
        withCredentials: false, // 默认的
        responseType: 'json', // 默认的
        parseJson: true,
        onUploadProgress: function (progressEvent) {
        },
        onDownloadProgress: function (progressEvent) {
        },
        maxContentLength: 2000,
      }
    }
  }