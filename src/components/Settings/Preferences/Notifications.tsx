import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState } from 'react';
import { CheckboxLabel } from '../Settings.components';
import { HelperText } from '../Settings.styles';

type PushTypes = 'all' | 'email' | 'none';

export const Notifications = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    activity: true,
    offers: false,
    interests: false,
  });

  const [pushNotifications, setPushNotifications] = useState<PushTypes>('all');

  const handleCheckboxGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailNotifications({
      ...emailNotifications,
      [event.target.name]: event.target.checked,
    });
  };

  const handleRadioGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPushNotifications((event.target as HTMLInputElement).value as PushTypes);
  };

  const { activity, offers, interests } = emailNotifications;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel sx={{ color: 'black' }} component="legend">
          By Email
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={activity} onChange={handleCheckboxGroup} name="activity" />}
            label={
              <CheckboxLabel
                title={'Activity'}
                helperText={'Get notified when your asset purchase is complete or incomplete.'}
              />
            }
          />

          <FormControlLabel
            control={<Checkbox checked={offers} onChange={handleCheckboxGroup} name="offers" />}
            label={
              <CheckboxLabel
                title={'Offers'}
                helperText={'Get notified when a user accepts or rejects an offer.'}
              />
            }
          />
          <FormControlLabel
            control={
              <Checkbox checked={interests} onChange={handleCheckboxGroup} name="interests" />
            }
            label={
              <CheckboxLabel
                title={'Interests'}
                helperText={'Get notified when a user favourites your asset.'}
              />
            }
          />
        </FormGroup>
      </FormControl>

      <FormControl sx={{ m: 3 }}>
        <FormLabel sx={{ color: 'black' }} id="push-notifications-radio-buttons-group">
          Push Notifications
        </FormLabel>
        <HelperText id="push-notifications-radio-buttons-group" sx={{ marginLeft: 0 }}>
          These are delivered via SMS to your mobile phone.
        </HelperText>
        <RadioGroup
          aria-labelledby="push-notifications-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={pushNotifications}
          onChange={handleRadioGroup}
        >
          <FormControlLabel value="all" control={<Radio />} label="Everything" />
          <FormControlLabel value="email" control={<Radio />} label="Same as email" />
          <FormControlLabel value="none" control={<Radio />} label="No push notifications" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
