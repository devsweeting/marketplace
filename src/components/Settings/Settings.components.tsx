import { Box, Grid } from '@mui/material';
import { PreferenceContainer, Title, Subtitle } from './Settings.styles';

export const Preference = ({
  title,
  component,
  subtitle,
}: {
  title: string;
  component: React.ReactNode;
  subtitle?: string;
}) => {
  return (
    <PreferenceContainer>
      <Grid container spacing={4}>
        <Grid item xs={5}>
          <Title variant="lg" fontWeight={600}>
            {title}
          </Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Grid>

        <Grid item xs={7}>
          <Box>{component}</Box>
        </Grid>
      </Grid>
    </PreferenceContainer>
  );
};
