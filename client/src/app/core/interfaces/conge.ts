import { Personnel } from "./personnel";

export interface Conge {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  date_debut: Date;
  date_fin: Date;
  resposable_informe: boolean;
  statut: string;
  personnelId: string;
  assetId: string;
  personnel: Personnel;
}
