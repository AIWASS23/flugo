import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import type { PropsWithChildren } from 'react';

interface AppShellProps extends PropsWithChildren {
  title?: string;
}

export function AppShell({ title, children }: AppShellProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 0% 0%, rgba(38,190,99,0.08), transparent 32%), #F8FAFC',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '280px 1fr' }
      }}
    >
      <Box
        component="aside"
        sx={{
          borderRight: '1px dashed #D9E2EC',
          p: 4,
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', mb: 6 }}>
          <Box component="span" sx={{ color: 'primary.main' }}>
            Fl
          </Box>
          ugo
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ color: '#64748B', fontWeight: 600, p: 1.5 }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <BadgeRoundedIcon fontSize="small" />
            <Typography>Colaboradores</Typography>
          </Stack>
          <ArrowForwardIosRoundedIcon sx={{ fontSize: 14 }} />
        </Stack>
      </Box>

      <Box sx={{ p: { xs: 2, md: 5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {title ?? ''}
          </Typography>
          <Avatar
            src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=flugo-admin"
            alt="Usuário"
            sx={{ width: 52, height: 52, bgcolor: '#E2E8F0' }}
          />
        </Stack>

        {children}
      </Box>
    </Box>
  );
}
