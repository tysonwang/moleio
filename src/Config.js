class Config{
    constructor(){
      return {
        url: '',
        method: 'GET',
        baseURL: '',
        transformRequest: [function (data) {
          return data;
        }],
        transformResponse: [function (data) {
          return data;
        }],
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        params: {
          ID: 12345
        },
        paramsSerializer: function (params) {
          return Qs.stringify(params, { arrayFormat: 'brackets' })
        },
        data: {
        },
        timeout: 1000,
        withCredentials: false, // 默认的
        adapter: function (config) {
        },
        auth: {
          username: 'janedoe',
          password: 's00pers3cret'
        },
        responseType: 'json', // 默认的
        xsrfCookieName: 'XSRF-TOKEN', // default
        xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
        onUploadProgress: function (progressEvent) {
        },
        onDownloadProgress: function (progressEvent) {
        },
        maxContentLength: 2000,
        validateStatus: function (status) {
          return status >= 200 && status < 300; // 默认的
        },
        maxRedirects: 5, // 默认的
        // httpAgent: new http.Agent({ keepAlive: true }),
        // httpsAgent: new https.Agent({ keepAlive: true }),
        proxy: {
          host: '127.0.0.1',
          port: 9000,
          auth: {
            username: 'mikeymike',
            password: 'rapunz3l'
          }
        },
        cancelToken: true
      }
    }
  }

  export default Config;