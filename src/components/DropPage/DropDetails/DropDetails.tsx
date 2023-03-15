import { ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, styled, Typography } from '@mui/material';

export interface InfoRow {
  key: string;
  value: string;
}

interface DropDetailsProps {
  info?: InfoRow[];
  description?: string;
}

const InfoRow = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  padding: '0.5rem 0',
}));

export function DropDetails(props: DropDetailsProps) {
  const { info = [], description } = props;

  return (
    <Accordion
      square
      expanded={true}
      disableGutters
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRounded />}
        sx={{
          fontFamily: 'Inter',
          fontSize: 18,
          fontWeigth: 500,
          padding: 0,
        }}
      >
        Card Details
      </AccordionSummary>
      <AccordionDetails
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: 0,
        }}
      >
        {info?.length || description ? (
          <>
            {info.map((row: InfoRow) => (
              <InfoRow key={row.key}>
                <Typography variant="body1">{row.key}</Typography>
                <Typography variant="body1">{row.value}</Typography>
              </InfoRow>
            ))}
            {description && (
              <Typography variant="body1" sx={{ marginTop: '1.5rem' }}>
                {description}
              </Typography>
            )}
          </>
        ) : (
          <Typography variant="body1">No information available</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
