import { Fonction } from './fonction';

export interface Personnel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  nom: string;
  prenom: string;
  email: string;
  address: string;
  telephone: string;
  situation_familiale: string;
  date_naissance: string;
  genre: string;
  info_complementaire: string;
  description_mission: string;
  fonctionId: string;
  assetId: string;
  signatureAssetId?: string;
  fonction: Fonction;
  direction: boolean;
  soldeConge: number
}
