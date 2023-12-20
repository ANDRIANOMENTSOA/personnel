import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {
  PersonnelCredentialRepository,
} from '../repositories';
import bcrypt from 'bcrypt';
import {
  TokenServiceBindings,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {TokenService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {PersonnelService} from '../services';

interface Credentials {
  email: string;
  password: string;
}

export class AuthenticateController {
  constructor(
    @repository(PersonnelCredentialRepository)
    private personnelCredentialRepository: PersonnelCredentialRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public personnelService: PersonnelService,
  ) {}

  @post('/authenticate/connexion', {
    responses: {
      '200': {
        description: 'connexion ok.',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
      '401': {
        description: 'connexion nok',
      },
    },
  })
  async connexion(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {type: 'string'},
              password: {type: 'string'},
            },
            required: ['email', 'password'],
          },
        },
      },
    })
    credentials: Credentials,
  ): Promise<{token: string; id: string}> {
    // ensure the personnel exists, and the password is correct
    const personnel = await this.personnelService.verifyCredentials(
      credentials,
    );
    // convert a personnel object into a personnelProfile object (reduced set of properties)
    const personnelProfile =
      this.personnelService.convertToUserProfile(personnel);

    // create a JSON Web Token based on the personnel profile
    const token = await this.jwtService.generateToken(personnelProfile);

    return {token, id: personnel.id};
  }

  @post('/authenticate/change', {
    responses: {
      '204': {
        description: 'change mot de passe.',
      },
    },
  })
  async nouveauxMotdepasse(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {type: 'string'},
              password: {type: 'string'},
              password2: {type: 'string'},
            },
            required: ['id', 'password', 'password2'],
          },
        },
      },
    })
    change: {
      id: string;
      password: string;
      password2: string;
    },
  ): Promise<void> {
    if (change.password !== change.password2) {
      throw new HttpErrors.Conflict('Le mot de passe doit être le même');
    }
    const credentials = {
      hash: await this.hashPassword(change.password),
      personnelId: change.id,
    };
    const existCredential = await this.personnelCredentialRepository.findOne({
      where: {personnelId: change.id},
    });
    if (existCredential) {
      this.personnelCredentialRepository.updateById(
        existCredential.id,
        credentials,
      );
    } else {
      this.personnelCredentialRepository.create(credentials);
    }
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(6);
    return bcrypt.hash(password, salt);
  }
}
