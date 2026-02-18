import { Chip } from '@mui/material';

interface StatusChipProps {
  active: boolean;
}

export function StatusChip({ active }: StatusChipProps) {
  return active ? (
    <Chip
      label="Ativo"
      size="small"
      sx={{
        bgcolor: '#DFF6E9',
        color: '#167A3D',
        fontWeight: 700
      }}
    />
  ) : (
    <Chip
      label="Inativo"
      size="small"
      sx={{
        bgcolor: '#FCE6E2',
        color: '#B12B1C',
        fontWeight: 700
      }}
    />
  );
}
