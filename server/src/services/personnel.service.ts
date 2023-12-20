import {injectable, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {Personnel} from '../models';
import {
  PersonnelCredentialRepository,
  PersonnelRepository,
} from '../repositories';
import bcrypt from 'bcrypt';

export type Credentials = {
  email: string;
  password: string;
};

export interface PersonnelProfile extends UserProfile {
  nom: string;
  id: string;
  email: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class PersonnelService {
  constructor(
    @repository(PersonnelRepository)
    private personelRepository: PersonnelRepository,
    @repository(PersonnelCredentialRepository)
    private personnelCredentialRepository: PersonnelCredentialRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<Personnel> {
    const personnel = await this.personelRepository.findOne({
      where: {email: credentials.email},
    });
    if (!personnel) {
      throw new HttpErrors.Conflict('Le mail ou le mot de passe est invalide');
    } else {
      const existCredential = await this.personnelCredentialRepository.findOne({
        where: {personnelId: personnel.id},
      });
      if (existCredential?.hash) {
        if (
          !(await bcrypt.compare(credentials.password, existCredential.hash))
        ) {
          throw new HttpErrors.Conflict(
            'Le mail ou le mot de passe est invalide',
          );
        }
      }
      return personnel;
    }
  }

  convertToUserProfile(personnel: Personnel): PersonnelProfile {
    return {
      [securityId]: personnel.id.toString(),
      nom: personnel.nom,
      id: personnel.id,
      email: personnel.email,
    };
  }
}
