import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { StyledInput, OutlinedLabel } from '../Settings.styles';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  BLUES,
  ColorCircle,
  getProfileGradientCookie,
  GRADIENT_COLORS,
  REDS,
} from '@/components/Avatar/Gradients';
import { useProfileGradient } from '@/helpers/hooks/useProfileGradient';

export const PersonalInformation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const anchor = useRef<HTMLButtonElement>(null);

  const [color, setColor] = useState(getProfileGradientCookie());
  const gradient = useProfileGradient(color);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Typography variant={'sm'} fontSize={'12px'} fontWeight={600}>
        Profile Color:
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton
          disableRipple
          onMouseDown={handleOpen}
          ref={anchor}
          size="small"
          // aria-controls={isOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          // aria-expanded={isOpen ? 'true' : undefined}
        >
          {gradient ? (
            <ColorCircle
              sx={{
                background: GRADIENT_COLORS[gradient],
                width: 48,
                height: 48,
                margin: 0,
                '&:hover': { transform: 'none' },
              }}
            />
          ) : (
            <Avatar sx={{ width: 48, height: 48 }} />
          )}
          <Menu
            open={isOpen}
            anchorEl={anchor.current}
            onClose={handleClose}
            // style={{ marginTop: matchesMobile ? 6 : 1 }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <div>
              <ColorPicker handleSetColor={(color) => setColor(color)} />
            </div>
          </Menu>
        </IconButton>

        {/* <Button size={'small'} variant="outlined">
          Save
        </Button> */}
      </Box>

      <Grid container spacing={2} sx={{ marginTop: '16px', display: 'flex' }}>
        <Grid item>
          <OutlinedLabel htmlFor="firstName">First name:</OutlinedLabel>
          <StyledInput
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>

        <Grid item>
          <OutlinedLabel htmlFor="lastName">Last name:</OutlinedLabel>
          <StyledInput
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const ColorPicker = ({ handleSetColor }: { handleSetColor: (color: string) => void }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box>
        {Object.keys(REDS).map((color, i) => {
          return (
            <MenuItem
              key={i}
              onClick={() => handleSetColor(color)}
              sx={{ display: 'flex', height: '48px' }}
            >
              <ColorCircle key={i} sx={{ background: REDS[color] }} />
            </MenuItem>
          );
        })}
      </Box>

      <Box>
        {Object.keys(BLUES).map((color, i) => {
          return (
            <MenuItem
              key={i}
              onClick={() => handleSetColor(color)}
              sx={{ display: 'flex', height: '48px' }}
            >
              <ColorCircle key={i} sx={{ background: BLUES[color] }} />
            </MenuItem>
          );
        })}
      </Box>
    </Box>
  );
};
