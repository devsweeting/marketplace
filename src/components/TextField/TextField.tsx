import { styled, TextField as MuiTextField } from '@mui/material';
import type { TextFieldProps as MuiTextFieldProps, Theme } from '@mui/material';
import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';

export type TextFieldProps = {
  rounded?: boolean;
} & MuiTextFieldProps;

type TextFieldStyleProps = {
  theme: Theme;
  rounded?: boolean;
};

/* eslint-disable react/display-name */
export const TextField = styled(
  forwardRef((props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>) => (
    <MuiTextField ref={ref} {...props} />
  )),
)(({ rounded }: TextFieldStyleProps) => ({
  '& > .MuiInputBase-root': {
    ...(rounded && {
      borderRadius: '100vw',
    }),
  },
}));

TextField.displayName = 'TextField';
