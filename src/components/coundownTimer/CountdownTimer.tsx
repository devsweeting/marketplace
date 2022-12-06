import { useInterval } from '@/helpers/hooks/useInterval';
import type { SxProps, Theme, TypographyTypeMap } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';

export interface CountdownProps {
  startTime: number;
  variant?: TypographyTypeMap['props']['variant'];
  sx?: SxProps<Theme>;
}

const CountdownTimer = ({ startTime, variant = 'body1', sx = {} }: CountdownProps) => {
  const [secondsRemaining, setSecondsRemaining] = useState(startTime);

  const secondsToDisplay = Math.ceil(secondsRemaining % 60);
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = Math.ceil(minutesRemaining % 60);
  const hoursToDisplay = Math.ceil((minutesRemaining - minutesToDisplay) / 60);

  useInterval(() => {
    if (secondsRemaining > 0) {
      setSecondsRemaining((prev) => prev - 1);
    }
  }, 1000);

  return (
    <Typography variant={variant} sx={sx}>
      {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
    </Typography>
  );
};
const twoDigits = (num: number) => String(num).padStart(2, '0');

// eslint-disable-next-line import/no-default-export
export default CountdownTimer;
