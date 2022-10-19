import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import type { StepIconProps } from '@mui/material/StepIcon';
import React from 'react';
import { StepLabel } from '@mui/material';
import { StepIconRoot, CompleteIcon, IncompleteIcon } from './DotStepper.styles';

function QontoStepIcon(props: StepIconProps) {
  const { active, completed } = props;

  return (
    <StepIconRoot active={active}>{completed ? <CompleteIcon /> : <IncompleteIcon />}</StepIconRoot>
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
