import {BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class ApiService {
  constructor() {}

  public basicTest() {
    return 5;
  }
}
