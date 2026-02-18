import { Alert, LinearProgress, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collaboratorEmailExists,
  createCollaborator
} from '../services/collaboratorService';
import { getErrorMessage } from '../services/errorMessage';
import type {
  BasicInfoData,
  CreateCollaboratorInput,
  ProfessionalInfoData
} from '../types/collaborator';
import { BasicInfoStep } from './BasicInfoStep';
import { ProfessionalInfoStep } from './ProfessionalInfoStep';
import { StepIndicator } from './StepIndicator';

interface FormErrors {
  basic: Partial<Record<keyof BasicInfoData, string>>;
  professional: Partial<Record<keyof ProfessionalInfoData, string>>;
}

const steps = ['Informações Básicas', 'Informações Profissionais'] as const;

const initialBasic: BasicInfoData = {
  name: '',
  email: '',
  active: true
};

const initialProfessional: ProfessionalInfoData = {
  department: ''
};

export function CollaboratorMultiStepForm() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState(initialBasic);
  const [professionalInfo, setProfessionalInfo] = useState(initialProfessional);
  const [errors, setErrors] = useState<FormErrors>({ basic: {}, professional: {} });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const progress = useMemo(
    () => (activeStep / (steps.length - 1)) * 100,
    [activeStep]
  );

  const validateBasicInfo = () => {
    const nextErrors: FormErrors['basic'] = {};

    if (!basicInfo.name.trim()) {
      nextErrors.name = 'Nome é obrigatório';
    }

    if (!basicInfo.email.trim()) {
      nextErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basicInfo.email)) {
      nextErrors.email = 'Informe um e-mail válido';
    }

    setErrors((previous) => ({ ...previous, basic: nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const validateProfessionalInfo = () => {
    const nextErrors: FormErrors['professional'] = {};

    if (!professionalInfo.department) {
      nextErrors.department = 'Departamento é obrigatório';
    }

    setErrors((previous) => ({ ...previous, professional: nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const markEmailAsInUse = () => {
    setErrors((previous) => ({
      ...previous,
      basic: {
        ...previous.basic,
        email: 'Este e-mail já está vinculado a outro usuário.'
      }
    }));
    setSubmitError('Este e-mail já está vinculado a outro usuário.');
  };

  const handleBasicInfoChange = (values: Partial<BasicInfoData>) => {
    setBasicInfo((previous) => ({ ...previous, ...values }));
    setSubmitError(null);
    setErrors((previous) => ({
      ...previous,
      basic: {
        ...previous.basic,
        ...(values.name !== undefined ? { name: undefined } : {}),
        ...(values.email !== undefined ? { email: undefined } : {})
      }
    }));
  };

  const handleProfessionalInfoChange = (values: Partial<ProfessionalInfoData>) => {
    setProfessionalInfo((previous) => ({ ...previous, ...values }));
    setSubmitError(null);
    setErrors((previous) => ({
      ...previous,
      professional: {
        ...previous.professional,
        ...(values.department !== undefined ? { department: undefined } : {})
      }
    }));
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!validateBasicInfo()) {
        return;
      }

      try {
        const emailInUse = await collaboratorEmailExists(basicInfo.email);
        if (emailInUse) {
          markEmailAsInUse();
          return;
        }
      } catch (error) {
        console.error('Erro ao validar e-mail no Firestore:', error);
        setSubmitError(`Erro ao validar e-mail (${getErrorMessage(error)}).`);
        return;
      }

      setSubmitError(null);
      setActiveStep(1);
      return;
    }

    if (!validateProfessionalInfo()) {
      setSubmitError('Selecione um departamento para concluir o cadastro.');
      return;
    }

    const department = professionalInfo.department;
    if (!department) {
      setSubmitError('Selecione um departamento para concluir o cadastro.');
      return;
    }

    setSubmitError(null);
    setSubmitting(true);

    try {
      const payload: CreateCollaboratorInput = {
        name: basicInfo.name.trim(),
        email: basicInfo.email.trim(),
        active: basicInfo.active,
        department
      };

      await createCollaborator(payload);
      navigate('/colaboradores');
    } catch (error) {
      console.error('Erro ao salvar colaborador no Firestore:', error);
      const errorMessage = getErrorMessage(error);
      const duplicateEmail =
        errorMessage.toLowerCase().includes('already exists') ||
        errorMessage.toLowerCase().includes('já está vinculado');

      if (duplicateEmail) {
        setActiveStep(0);
        markEmailAsInUse();
        return;
      }

      setSubmitError(`Erro ao salvar colaborador (${errorMessage}).`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate('/colaboradores');
      return;
    }
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Typography sx={{ fontWeight: 700 }}>Colaboradores</Typography>
        <Typography sx={{ color: '#94A3B8' }}>•</Typography>
        <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>Cadastrar Colaborador</Typography>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 999,
            flex: 1,
            bgcolor: '#D8F3E4',
            '& .MuiLinearProgress-bar': {
              borderRadius: 999
            }
          }}
        />
        <Typography sx={{ color: '#64748B', fontWeight: 700 }}>{`${Math.round(progress)}%`}</Typography>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6}>
        <StepIndicator activeStep={activeStep} />

        <Stack spacing={4} flex={1}>
          {activeStep === 0 ? (
            <BasicInfoStep
              data={basicInfo}
              errors={errors.basic}
              onChange={handleBasicInfoChange}
            />
          ) : (
            <ProfessionalInfoStep
              data={professionalInfo}
              errors={errors.professional}
              onChange={handleProfessionalInfoChange}
            />
          )}

          {submitError ? <Alert severity="error">{submitError}</Alert> : null}
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="space-between" pt={4}>
        <Button
          variant="text"
          color="inherit"
          onClick={handleBack}
          sx={{ fontWeight: 700, color: '#94A3B8' }}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            void handleNext();
          }}
          disabled={submitting || (activeStep === steps.length - 1 && !professionalInfo.department)}
          sx={{ minWidth: 150, py: 1.5 }}
        >
          {activeStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
        </Button>
      </Stack>
    </Stack>
  );
}
