export default class EngineAdapter {
    constructor(engine) {
      return engine || XMLHttpRequest;
  
    }
  }