import { MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DEPARTMENTS, type ProfessionalInfoData } from '../types/collaborator';

interface ProfessionalInfoStepProps {
  data: ProfessionalInfoData;
  errors: Partial<Record<keyof ProfessionalInfoData, string>>;
  onChange: (values: Partial<ProfessionalInfoData>) => void;
}

export function ProfessionalInfoStep({
  data,
  errors,
  onChange
}: ProfessionalInfoStepProps) {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" sx={{ color: '#64748B', fontWeight: 800 }}>
        Informações Profissionais
      </Typography>

      <TextField
        select
        label="Selecione um departamento"
        value={data.department}
        onChange={(event) =>
          onChange({ department: event.target.value as ProfessionalInfoData['department'] })
        }
        required
        fullWidth
        error={Boolean(errors.department)}
        helperText={errors.department}
      >
        <MenuItem value="" disabled>
          Selecione um departamento
        </MenuItem>
        {DEPARTMENTS.map((department) => (
          <MenuItem key={department} value={department}>
            {department}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
