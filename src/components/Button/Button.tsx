import type { ButtonProps as MaterialButtonProps } from '@mui/material/Button';
import MaterialButton from '@mui/material/Button';
import { styled } from '@mui/material';
import type { Theme } from '@mui/material';
import { forwardRef } from 'react';

export interface ButtonProps extends MaterialButtonProps {
  rounded?: boolean;
}

type ButtonStyleProps = {
  theme: Theme;
  rounded?: boolean;
};

/* eslint-disable react/display-name */
export const Button = styled(
  forwardRef((props: ButtonProps, ref: any) => (
    <MaterialButton ref={ref} {...props}>
      {props.children}
    </MaterialButton>
  )),
)(({ theme, rounded }: ButtonStyleProps) => ({
  borderRadius: rounded ? '100vw' : theme.shape.borderRadius,
}));

Button.displayName = 'Button';
