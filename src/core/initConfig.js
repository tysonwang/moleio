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
        data: {},
        timeout: 1000,
        withCredentials: false, 
        responseType: 'json', 
        maxContentLength: 2000,
        
      }
    }
  }