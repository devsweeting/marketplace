import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { SkinContext } from '../../../styles/skin-context';

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
  const { skin } = useContext(SkinContext);
  return (
    <Box
      sx={{
        borderTop: top,
        borderBottom: bottom,
        borderLeft: left,
        borderRight: right,
        boxSizing: 'border-box',
        borderImageSlice: 1,
        borderColor: '#fff',
        borderBackground: '#fff',
        borderImageSource: `url(${skin.borderBoxBackground})`,
      }}
    >
      {children}
    </Box>
  );
};
