import React from 'react';
import { Typography, Accordion as MaterialAccordion } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAccordionStyles } from './AccordionTextItem.styles';

export interface AccordionTextItemProps {
  title: string;
  children: string;
  isExpanded?: boolean;
}

export const AccordionTextItem: React.FC<AccordionTextItemProps> = ({
  title,
  children,
  isExpanded,
}) => {
  const classes = useAccordionStyles();

  return (
    <MaterialAccordion disableGutters defaultExpanded={isExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.textItemTitle}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MaterialAccordion>
  );
};
