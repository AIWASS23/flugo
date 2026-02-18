import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import type {
  Collaborator,
  CreateCollaboratorInput,
  Department
} from '../types/collaborator';
import { db } from './firebase';

const collectionRef = collection(db, 'collaborators');

interface CollaboratorDoc {
  name: string;
  email: string;
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

export async function createCollaborator(input: CreateCollaboratorInput) {
  await addDoc(collectionRef, {
    ...input,
    createdAt: serverTimestamp()
  });
}
