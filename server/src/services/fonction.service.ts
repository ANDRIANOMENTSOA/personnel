import {BindingScope, injectable} from '@loopback/core';
import {FonctionRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class FonctionService {
  constructor(public fonctionRepostiory: FonctionRepository) {}

  find() {
    return this.fonctionRepostiory.find();
  }
}
