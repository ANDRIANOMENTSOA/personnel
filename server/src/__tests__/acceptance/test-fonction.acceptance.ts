import {expect} from '@loopback/testlab';
import {ApiApplication} from '../..';
import {FonctionController} from '../../controllers';
import {Fonction} from '../../models';
import {FonctionRepository} from '../../repositories';
import {setupApplication} from './test-helper';

describe('Test Crud fonction', () => {
  let fonctionController: FonctionController;
  let fonctionRepository: FonctionRepository;
  // let fonctionService: FonctionService;
  let app: ApiApplication;

  let fonction: Fonction;

  before('setupApplication', async () => {
    app = (await setupApplication()).app;
    fonctionRepository = await app.get('repositories.FonctionRepository');
    fonctionController = await app.get('controllers.FonctionController');
    // fonctionService = new FonctionService(fonctionRepository);
  });

  it('Create', async () => {
    const newFonction = {
      nom: 'Name Function Test',
    };
    fonction = await fonctionRepository.create(newFonction);
    expect(newFonction.nom).to.equal(fonction.nom);
  });

  it('Read', async () => {
    const findWithRepository = await fonctionRepository.find();
    expect(true).to.equal(findWithRepository.length > 0);
    console.log('fonction list', findWithRepository);
  });

  it('Update', async () => {
    const update = {
      nom: 'Update fonction',
    };
    await fonctionRepository.updateById(fonction.id, update);
    const findWithController = await fonctionController.findById(fonction.id);
    expect(findWithController.nom).to.equal(update.nom);
    console.log('fonction list update', findWithController);
  });

  it('Delete', async () => {
    await fonctionRepository.deleteById(fonction.id);
    const findWithService = await fonctionRepository.find();
    expect(true).to.equal(
      findWithService.filter(f => f.id === fonction.id).length === 0,
    );
    console.log('fonction list delete', findWithService);
  });
});
