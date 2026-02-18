import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Alert, Box, Button, CircularProgress, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../../shared/layout/AppShell';
import { CollaboratorsTable } from '../components/CollaboratorsTable';
import { useCollaborators } from '../hooks/useCollaborators';

export function CollaboratorsListPage() {
  const navigate = useNavigate();
  const { collaborators, error, loading } = useCollaborators();

  return (
    <AppShell title="Colaboradores">
      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            size="large"
            startIcon={<AddRoundedIcon />}
            onClick={() => navigate('/colaboradores/novo')}
            sx={{ px: 3, py: 1.6 }}
          >
            Novo Colaborador
          </Button>
        </Box>

        {error ? <Alert severity="error">{error}</Alert> : null}

        {loading ? (
          <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 220 }}>
            <CircularProgress />
          </Box>
        ) : (
          <CollaboratorsTable collaborators={collaborators} />
        )}
      </Stack>
    </AppShell>
  );
}
