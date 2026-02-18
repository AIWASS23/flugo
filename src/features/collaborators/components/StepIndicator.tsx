import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Box, Stack, Typography } from '@mui/material';

interface StepIndicatorProps {
  activeStep: number;
}

const steps = ['Infos Básicas', 'Infos Profissionais'];

export function StepIndicator({ activeStep }: StepIndicatorProps) {
  return (
    <Stack spacing={2.5} sx={{ minWidth: 200 }}>
      {steps.map((label, index) => {
        const step = index + 1;
        const isDone = activeStep > index;
        const isActive = activeStep === index;

        return (
          <Stack key={label} direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
                bgcolor: isDone || isActive ? 'primary.main' : '#E2E8F0',
                color: isDone || isActive ? '#fff' : '#64748B'
              }}
            >
              {isDone ? <CheckRoundedIcon sx={{ fontSize: 20 }} /> : step}
            </Box>
            <Typography
              sx={{
                color: isDone || isActive ? '#1F2937' : '#94A3B8',
                fontWeight: isActive ? 800 : 700
              }}
            >
              {label}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}
