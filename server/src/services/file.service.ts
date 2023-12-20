import {BindingScope, Provider, config, bind} from '@loopback/core';
import {RequestHandler} from 'express-serve-static-core';
import multer from 'multer';

@bind({scope: BindingScope.TRANSIENT})
export class FileProvider implements Provider<RequestHandler> {
  constructor(@config() private options: multer.Options = {}) {}

  value(): RequestHandler {
    return multer(this.options).any();
  }
}
