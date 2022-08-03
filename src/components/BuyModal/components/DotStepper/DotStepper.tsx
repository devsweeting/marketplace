import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import type { StepIconProps } from '@mui/material/StepIcon';
import React from 'react';
import { Check } from '@mui/icons-material';
import { useDotStepperStyles } from './DotStepper.styles';
import { StepLabel } from '@mui/material';

function QontoStepIcon(props: StepIconProps) {
  const { active, completed } = props;
  const iconStyles = useDotStepperStyles();

  return (
    <div className={iconStyles.ontoStepIconRoot} style={{ color: active ? '#784af4' : '' }}>
      {completed ? (
        <Check className={iconStyles.completedIcon} />
      ) : (
        <div className={iconStyles.circleIcon} />
      )}
    </div>
  );
}
export interface IDotStepper {
  value: number;
  steps: string[];
}
export const DotStepper = ({ value, steps }: IDotStepper) => {
  return (
    <div>
      <Stepper activeStep={value}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};
