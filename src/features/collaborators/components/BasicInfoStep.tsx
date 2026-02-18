import { FormControlLabel, Stack, Switch, TextField, Typography } from '@mui/material';
import type { BasicInfoData } from '../types/collaborator';

interface BasicInfoStepProps {
  data: BasicInfoData;
  errors: Partial<Record<keyof BasicInfoData, string>>;
  onChange: (values: Partial<BasicInfoData>) => void;
}

export function BasicInfoStep({ data, errors, onChange }: BasicInfoStepProps) {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" sx={{ color: '#64748B', fontWeight: 800 }}>
        Informações Básicas
      </Typography>

      <TextField
        label="Título"
        value={data.name}
        onChange={(event) => onChange({ name: event.target.value })}
        required
        fullWidth
        error={Boolean(errors.name)}
        helperText={errors.name}
      />

      <TextField
        label="E-mail"
        type="email"
        value={data.email}
        onChange={(event) => onChange({ email: event.target.value })}
        placeholder="e.g. john@gmail.com"
        required
        fullWidth
        error={Boolean(errors.email)}
        helperText={errors.email}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.active}
            onChange={(event) => onChange({ active: event.target.checked })}
          />
        }
        label="Ativar ao criar"
      />
    </Stack>
  );
}
