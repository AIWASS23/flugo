import { Navigate, Route, Routes } from 'react-router-dom';
import { CollaboratorsListPage } from '../../features/collaborators/pages/CollaboratorsListPage';
import { CreateCollaboratorPage } from '../../features/collaborators/pages/CreateCollaboratorPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/colaboradores" element={<CollaboratorsListPage />} />
      <Route path="/colaboradores/novo" element={<CreateCollaboratorPage />} />
      <Route path="*" element={<Navigate to="/colaboradores" replace />} />
    </Routes>
  );
}
