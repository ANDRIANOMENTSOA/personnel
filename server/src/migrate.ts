import {ApiApplication} from './application';
import {
  PersonnelCredentialRepository,
  PersonnelRepository,
} from './repositories';
import bcrypt from 'bcrypt';

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new ApiApplication();
  await app.boot();
  await app.migrateSchema({existingSchema});

  /*
  const perso = await app.getRepository(PersonnelRepository);

  const personnel = await perso.create({
    nom: 'ANDRIANOMENTSOA',
    prenom: 'Aimé Joseph',
    email: 'aaimjoseph@gmail.com',
    description_mission: 'description_mission',
  });

  const salt = await bcrypt.genSalt(6);

  const credentials = {
    hash: await bcrypt.hash('Ajadinyaiko010028.', salt),
    personnelId: personnel.id,
  };

  const crendential = await app.getRepository(PersonnelCredentialRepository);

  await crendential.create(credentials);
  */


  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
