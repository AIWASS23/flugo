import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore';
import type {
  Collaborator,
  CreateCollaboratorInput,
  Department
} from '../types/collaborator';
import { db } from './firebase';

const collectionRef = collection(db, 'collaborators');

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

interface CollaboratorDoc {
  name: string;
  email: string;
  emailNormalized?: string;
  department: Department;
  active: boolean;
  createdAt?: {
    toDate?: () => Date;
  };
}

export async function getCollaborators(): Promise<Collaborator[]> {
  const snapshot = await getDocs(query(collectionRef, orderBy('createdAt', 'desc')));

  return snapshot.docs.map((doc) => {
    const data = doc.data() as CollaboratorDoc;

    return {
      id: doc.id,
      name: data.name,
      email: data.email,
      department: data.department,
      active: data.active,
      createdAt: data.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString()
    };
  });
}

export async function collaboratorEmailExists(email: string): Promise<boolean> {
  const normalizedEmail = normalizeEmail(email);
  const directSnapshot = await getDocs(
    query(collectionRef, where('email', '==', normalizedEmail), limit(1))
  );

  if (!directSnapshot.empty) {
    return true;
  }

  const normalizedSnapshot = await getDocs(
    query(collectionRef, where('emailNormalized', '==', normalizedEmail), limit(1))
  );

  if (!normalizedSnapshot.empty) {
    return true;
  }

  // Fallback para registros antigos que possam ter e-mail salvo em outro formato.
  const legacySnapshot = await getDocs(collectionRef);
  return legacySnapshot.docs.some((doc) => {
    const data = doc.data() as Partial<CollaboratorDoc>;
    if (typeof data.email !== 'string') {
      return false;
    }
    return normalizeEmail(data.email) === normalizedEmail;
  });
}

export async function createCollaborator(input: CreateCollaboratorInput) {
  if (!input.department) {
    throw new Error('Departamento é obrigatório.');
  }

  const normalizedEmail = normalizeEmail(input.email);
  const emailInUse = await collaboratorEmailExists(normalizedEmail);

  if (emailInUse) {
    throw new Error('Este e-mail já está vinculado a outro usuário.');
  }

  await addDoc(collectionRef, {
    ...input,
    email: normalizedEmail,
    emailNormalized: normalizedEmail,
    createdAt: serverTimestamp()
  });
}
