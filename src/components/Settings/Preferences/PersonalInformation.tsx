import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { Button, StyledInput, OutlinedLabel, ColorCircle } from '../Settings.styles';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useOutsideClick } from '@/helpers/hooks/useOutsideClick';

const PersonalInformation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const anchor = useRef<HTMLButtonElement>(null);
  const [color, setColor] = useState<string>('');

  const setTheColor = (color: string) => setColor(color);
  //   console.log('COLOR PICKED', color);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  //   console.log('Name:', firstName, ' ', lastName);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOutsideClick(anchor);

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
          {color ? (
            <ColorCircle
              sx={{
                background: GRADIENT_COLORS[color],
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
              <ColorPicker handleSetColor={setTheColor} />
            </div>
          </Menu>
        </IconButton>

        <Button size={'small'} variant="outlined" disabled={!color}>
          Save
        </Button>
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

export default PersonalInformation;

type BLUES = 'lightgreen' | 'green' | 'blue';
type REDS = 'orange' | 'pink' | 'purple';
type COLORS = BLUES | REDS;

const BLUES: Record<BLUES | string, string> = {
  lightgreen: 'linear-gradient(180deg, #a8ff78 0%, #78ffd6 100%)',
  green: 'linear-gradient(180deg, #00F260 0%, #0575E6 100%)',
  blue: 'linear-gradient(180deg, #7F7FD5 0%, #91EAE4 100%)',
};

const REDS: Record<REDS | string, string> = {
  orange: 'linear-gradient(180deg, #f12711 0%, #f5af19 100%)',
  pink: 'linear-gradient(180deg, #FC5C7D 0%, #cc5333 100%)',
  purple: 'linear-gradient(180deg, #7C3AED 0%, #DB2777 100%)',
};

const GRADIENT_COLORS = { ...BLUES, ...REDS };

const ColorPicker = ({ handleSetColor }: { handleSetColor: (color: string) => void }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box>
        {Object.keys(REDS).map((color, i) => {
          return (
            <MenuItem
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
