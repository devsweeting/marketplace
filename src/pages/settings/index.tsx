import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { OpenGraph } from '@/components/OpenGraph';
import { BlockContainer, Header } from './SettingsPage.styles';

const SettingsPage: NextPage = () => {
  return (
    <Grid sx={{ height: '100vh', marginTop: '100px' }}>
      <OpenGraph title={'Settings'} description={'User profile settings and preferences'} />
      <Typography sx={{ padding: '50px 0' }} variant="xl5" fontWeight={700}>
        Account
      </Typography>
      <Block header={'Profile'}>
        <Box>This is a form</Box>
      </Block>
    </Grid>
  );
};

export default SettingsPage;

const Block = ({ header, children }: { header: string; children: React.ReactNode }) => {
  return (
    <BlockContainer>
      <Header>{header}</Header>
      <Box>{children}</Box>
    </BlockContainer>
  );
};
