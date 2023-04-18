import { Box, styled } from '@mui/material';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useEffect, useState } from 'react';

type BLUES = 'lightgreen' | 'green' | 'blue';
type REDS = 'orange' | 'pink' | 'purple';
type COLORS = BLUES | REDS;

export const BLUES: Record<BLUES | string, string> = {
  lightgreen: 'linear-gradient(180deg, #a8ff78 0%, #78ffd6 100%)',
  green: 'linear-gradient(180deg, #00F260 0%, #0575E6 100%)',
  blue: 'linear-gradient(180deg, #7F7FD5 0%, #91EAE4 100%)',
};

export const REDS: Record<REDS | string, string> = {
  orange: 'linear-gradient(180deg, #f12711 0%, #f5af19 100%)',
  pink: 'linear-gradient(180deg, #FC5C7D 0%, #cc5333 100%)',
  purple: 'linear-gradient(180deg, #7C3AED 0%, #DB2777 100%)',
};

export const ColorCircle = styled(Box)({
  borderRadius: '999px',
  width: '24px',
  height: '24px',
  margin: '8px',
  '&:hover': {
    transition: 'all 250ms ease-in-out',
    transform: 'scale(1.2)',
  },
});

export const GRADIENT_COLORS = { ...BLUES, ...REDS };

const PROFILE_GRADIENT = 'PROFILE_GRADIENT';

export const getProfileGradientCookie = (): string | undefined => {
  const cookies = parseCookies(null, {});

  if (Object.prototype.hasOwnProperty.call(cookies, PROFILE_GRADIENT)) {
    const profileGradient = cookies[PROFILE_GRADIENT];
    return profileGradient;
  }
};

export const setProfileGradientCookie = (color: string) => {
  setCookie(null, PROFILE_GRADIENT, color, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

export const destroyProfileGradientCookie = () => {
  destroyCookie(null, PROFILE_GRADIENT);
};
