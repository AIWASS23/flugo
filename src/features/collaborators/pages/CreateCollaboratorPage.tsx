import { Paper } from '@mui/material';
import { AppShell } from '../../../shared/layout/AppShell';
import { CollaboratorMultiStepForm } from '../components/CollaboratorMultiStepForm';

export function CreateCollaboratorPage() {
  return (
    <AppShell title="">
      <Paper sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4 }}>
        <CollaboratorMultiStepForm />
      </Paper>
    </AppShell>
  );
}
