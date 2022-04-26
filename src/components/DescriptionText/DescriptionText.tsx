import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { SkinContext } from '../../../styles/skin-context';

interface BorderBoxProps {
  text: string;
}

export const DescriptionText: React.FC<BorderBoxProps> = ({ text }) => {
  const { skin } = useContext(SkinContext);
  return (
    <Box sx={{}}>
      <Box mb={6}>
        <Divider />
      </Box>
      <Typography variant="h4" component="h2" mb={3} sx={{ color: '#000' }}>
        Description
      </Typography>
      <Typography variant="body1" component="h2" sx={{ fontSize: '16px' }}>
        {text}
      </Typography>
    </Box>
  );
};
