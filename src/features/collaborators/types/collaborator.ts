export const DEPARTMENTS = [
  'Design',
  'TI',
  'Marketing',
  'Produto',
  'RH',
  'Financeiro'
] as const;

export type Department = (typeof DEPARTMENTS)[number];

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  department: Department;
  active: boolean;
  createdAt: string;
}

export interface CreateCollaboratorInput {
  name: string;
  email: string;
  department: Department;
  active: boolean;
}

export interface BasicInfoData {
  name: string;
  email: string;
  active: boolean;
}

export interface ProfessionalInfoData {
  department: Department | '';
}
