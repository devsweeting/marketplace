import React /* , { useContext } */ from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// import { SkinContext } from '../../../styles/skin-context';
import { useDescriptionTextStyles } from './DescriptionText.styles';

interface BorderBoxProps {
  text: string;
}

export const DescriptionText: React.FC<BorderBoxProps> = ({ text }) => {
  const classes = useDescriptionTextStyles();
  // const { skin } = useContext(SkinContext);
  return (
    <Box className={classes.wrapper}>
      <Box my={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Divider />
      </Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{ marginBottom: { xs: 2, md: 3 }, color: '#000' }}
      >
        Description
      </Typography>
      <Typography variant="body1" component="h2" sx={{ fontSize: '16px' }}>
        {text}
      </Typography>
    </Box>
  );
};
