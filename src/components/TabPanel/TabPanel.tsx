import * as React from 'react';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
}
export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={className}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
