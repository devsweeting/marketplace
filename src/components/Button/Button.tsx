import type { ButtonProps as MaterialButtonProps } from '@mui/material/Button';
import MaterialButton from '@mui/material/Button';
import { styled } from '@mui/material';
import type { Theme } from '@mui/material';
import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';

export interface ButtonProps extends MaterialButtonProps {
  rounded?: boolean;
}

interface ButtonStyleProps {
  theme: Theme;
  rounded?: boolean;
}

/* eslint-disable react/display-name */
export const Button = styled(
  forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => (
    <MaterialButton ref={ref} {...props}>
      {props.children}
    </MaterialButton>
  )),
)(({ rounded }: ButtonStyleProps) => ({
  ...(rounded && {
    borderRadius: '100vw',
  }),
}));

Button.displayName = 'Button';
