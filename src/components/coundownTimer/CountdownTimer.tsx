import { useInterval } from '@/helpers/hooks/useInterval';
import type { SxProps, Theme } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';

export const CountdownTimer = ({
  startTime,
  sx = [],
}: {
  startTime: number;
  sx?: SxProps<Theme>;
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(startTime);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  useInterval(() => {
    if (secondsRemaining > 0) {
      setSecondsRemaining(secondsRemaining - 1);
    }
  }, 1000);

  return (
    <Typography sx={sx}>
      {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
    </Typography>
  );
};
const twoDigits = (num: number) => String(num).padStart(2, '0');
