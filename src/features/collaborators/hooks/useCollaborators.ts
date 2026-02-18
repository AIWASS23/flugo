import { useCallback, useEffect, useState } from 'react';
import { getCollaborators } from '../services/collaboratorService';
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
    } catch {
      setError('Erro ao carregar colaboradores. Verifique a configuração do Firebase.');
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
