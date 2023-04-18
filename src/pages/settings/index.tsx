import React from 'react';
import { Typography } from '@mui/material';
import type { NextPage, NextApiRequest } from 'next';
import { OpenGraph } from '@/components/OpenGraph';
import { Preference } from '../../components/Settings/Settings.components';
import { PageContainer } from '../../components/Settings/Settings.styles';
import { getUserFromRequest } from '@/helpers/auth/getUserFrom';
import PersonalInformation from '@/components/Settings/Preferences/PersonalInformation';
import PaymentDetails from '@/components/Settings/Preferences/PaymentDetails';

const SettingsPage: NextPage = () => {
  return (
    <PageContainer>
      <OpenGraph title={'Settings'} description={'User profile settings and preferences'} />
      <Typography sx={{ padding: '50px 0' }} variant="xl2" fontWeight={700}>
        Account
      </Typography>
      <Preference title={'Personal Information'} component={<PersonalInformation />} />
      <Preference
        title={'Payment Details'}
        subtitle={'Update your billing information'}
        component={<PaymentDetails />}
      />
    </PageContainer>
  );
};

export default SettingsPage;

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const user = await getUserFromRequest(req);
  if (!user) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
};
