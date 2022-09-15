import * as React from 'react';
import { styled } from '@mui/material/styles';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { AccordionProps } from '@mui/material/Accordion';
import MuiAccordion from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} />}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(0),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: `${theme.spacing(2)} 0`,
}));

export const CustomizedAccordions = () => {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          style={{ padding: '0', fontWeight: 'bold', fontSize: '1.3rem' }}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography style={{ padding: '0', fontWeight: 'bold', fontSize: '1.3rem' }}>
            What is the biggest advantage of selling my items with PWCC?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            style={{ padding: '0', fontWeight: 'normal', fontSize: '1.1rem', opacity: '0.5' }}
          >
            {`PWCC offers the largest auction venue specifically targeted to trading cards worldwide
            with thousands of unique users participating in every auction. PWCC's strong reputation
            in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace
            generally garner higher sale prices when compared with prices from other venues.
            Finally, PWCC’s fees are lower than many other venues and lower in many cases than
            selling individually.`}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          style={{ padding: '0', fontWeight: 'bold', fontSize: '1.3rem' }}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography style={{ padding: '0', fontWeight: 'bold', fontSize: '1.3rem' }}>
            What is the biggest advantage of selling my items with PWCC?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            style={{ padding: '0', fontWeight: 'normal', fontSize: '1.1rem', opacity: '0.5' }}
          >
            {`PWCC offers the largest auction venue specifically targeted to trading cards worldwide
            with thousands of unique users participating in every auction. PWCC's strong reputation
            in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace
            generally garner higher sale prices when compared with prices from other venues.
            Finally, PWCC’s fees are lower than many other venues and lower in many cases than
            selling individually.`}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          style={{ padding: '0', fontWeight: 'bold', fontSize: '1.3rem' }}
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <Typography style={{ padding: '0', fontWeight: 'bold', fontSize: '1.3rem' }}>
            What is the biggest advantage of selling my items with PWCC?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            style={{ padding: '0', fontWeight: 'normal', fontSize: '1.1rem', opacity: '0.5' }}
          >
            {`PWCC offers the largest auction venue specifically targeted to trading cards worldwide
            with thousands of unique users participating in every auction. PWCC's strong reputation
            in the market causes buyers to bid with confidence. Items sold on the PWCC Marketplace
            generally garner higher sale prices when compared with prices from other venues.
            Finally, PWCC’s fees are lower than many other venues and lower in many cases than
            selling individually.`}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
