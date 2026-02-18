import { useCallback, useEffect, useState } from 'react';
import { getCollaborators } from '../services/collaboratorService';
import { getErrorMessage } from '../services/errorMessage';
import type { Collaborator } from '../types/collaborator';

export function useCollaborators() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollaborators = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCollaborators();
      setCollaborators(data);
    } catch (error) {
      console.error('Erro ao carregar colaboradores no Firestore:', error);
      setError(`Erro ao carregar colaboradores (${getErrorMessage(error)}).`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCollaborators();
  }, [fetchCollaborators]);

  return {
    collaborators,
    loading,
    error,
    refetch: fetchCollaborators
  };
}
