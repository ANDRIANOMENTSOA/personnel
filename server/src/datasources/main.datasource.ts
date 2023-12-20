import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'main',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'ergomada',
};

// simafri
/*const config = {
  name: 'main',
  connector: 'mysql',
  url: '',
  host: '178.159.5.244',
  //port: 3306,
  user: 'ajadimg_ergo',
  password: 'ergo',
  database: 'ajadimg_ergo',
};*/

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MainDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'main';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.main', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}