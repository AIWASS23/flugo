import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import {
  Avatar,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import type { Collaborator } from '../types/collaborator';
import { StatusChip } from '../../../shared/components/StatusChip';

interface CollaboratorsTableProps {
  collaborators: Collaborator[];
}

const columns = ['Nome', 'Email', 'Departamento', 'Status'] as const;

export function CollaboratorsTable({ collaborators }: CollaboratorsTableProps) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#EEF2F6' }}>
            {columns.map((column) => (
              <TableCell key={column} sx={{ color: '#64748B', fontWeight: 700 }}>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <span>{column}</span>
                  <ArrowDownwardRoundedIcon sx={{ fontSize: 16 }} />
                </Stack>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {collaborators.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                <Typography color="#94A3B8" fontWeight={600}>
                  Nenhum colaborador cadastrado ainda.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            collaborators.map((collaborator) => (
              <TableRow key={collaborator.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(
                        collaborator.name
                      )}`}
                      alt={collaborator.name}
                    />
                    <Typography fontWeight={600}>{collaborator.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{collaborator.email}</TableCell>
                <TableCell>{collaborator.department}</TableCell>
                <TableCell>
                  <StatusChip active={collaborator.active} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
