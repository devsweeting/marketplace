import React from 'react';
import { Box } from '@mui/material';

interface BorderBoxProps {
  children: JSX.Element;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export const BorderBox: React.FC<BorderBoxProps> = ({
  children,
  top = 0,
  left = 0,
  bottom = 0,
  right = 0,
}) => {
  return (
    <Box
      sx={{
        borderTop: top,
        borderBottom: bottom,
        borderLeft: left,
        borderRight: right,
        boxSizing: 'border-box',
        borderImageSlice: 1,
        borderCollor: '#fff',
        borderImageSource: `url('/images/detail_page.png')`,
      }}
    >
      {children}
    </Box>
  );
};
