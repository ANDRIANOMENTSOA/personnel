import {expect} from '@loopback/testlab';
import {CongeController} from '../../controllers';
import {
  AssetRepository,
  CongeRepository,
  PersonnelRepository,
  ReglageRepository,
} from '../../repositories';
import {
  ApiService,
  CongeService,
  FileStorageService,
  MailerService,
} from '../../services';
describe('Basic test', async () => {
  let apiService: ApiService;

  let congeService: CongeService;

  let congeRepository: CongeRepository;
  let personnelRepository: PersonnelRepository;
  let fileStorage: FileStorageService;
  let mailer: MailerService;
  let assetRepository: AssetRepository;

  let congeController: CongeController;
  let reglageRepository: ReglageRepository;

  before('createStubInstance', async () => {
    congeService = new CongeService(
      congeRepository,
      personnelRepository,
      fileStorage,
      mailer,
      assetRepository,
    );
    apiService = new ApiService();
    congeController = new CongeController(
      congeRepository,
      reglageRepository,
      assetRepository,
      fileStorage,
      congeService,
    );
  });

  it('Test in conge service', () => {
    const service = congeService.basicTest();
    expect(service).to.eql(5);
  });
  it('Test in Api service', async () => {
    const api = apiService.basicTest();
    expect(api).to.eql(5);
  });

  it('Test in Controller', async () => {
    const controller = congeController.testFunctionController();
    expect(controller).to.eql(5);
  });
});
