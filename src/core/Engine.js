import Adapter from './Adapter'
export default class Engine {
    constructor(engine) {
      return new Adapter(engine) || XMLHttpRequest;
  
    }
  }