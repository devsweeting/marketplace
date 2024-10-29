import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import type { NextPage, NextApiRequest } from 'next';
import { OpenGraph } from '@/components/OpenGraph';
import { Preference } from '../../components/Settings/Settings.components';
import { PageContainer } from '../../components/Settings/Settings.styles';
import { getUserFromRequest } from '@/helpers/auth/getUserFrom';
import { PersonalInformation } from '@/components/Settings/Preferences/PersonalInformation';
import { Notifications } from '@/components/Settings/Preferences/Notifications';
import { UserContext } from '@/helpers/auth/UserContext';

const SettingsPage: NextPage = () => {
  const user = useContext(UserContext).user;

  // Create a function to get user details to fill in initial default state for the forms
  return (
    <PageContainer sx={{ height: 'auto' }}>
      <OpenGraph title={'Settings'} description={'User profile settings and preferences'} />
      <Typography sx={{ padding: '50px 0' }} variant="xl2" fontWeight={700}>
        Account
      </Typography>
      <Preference title={'Personal Information'} component={<PersonalInformation />} />
      {/* TODO - Set up Stripe Connect */}
      {/* <Preference
        title={'Payment Details'}
        subtitle={'Update your billing information'}
        component={<PaymentDetails />}
      /> */}
      <Preference
        title={'Notifications'}
        subtitle={
          "We'll always let you know about important changes, but you pick what else you want to hear about."
        }
        component={<Notifications />}
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

  //TODO - return user here when BE is ready
  return {
    props: {},
  };
};
