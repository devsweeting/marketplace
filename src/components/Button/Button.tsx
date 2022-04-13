import React from 'react';
import classNames from 'classnames';
import MaterialButton, { ButtonProps as MaterialButtonProps } from '@mui/material/Button';
import { useButtonStyles } from './Button.styles';

export interface ButtonProps extends Omit<MaterialButtonProps, 'variant'> {
  variant: 'outlined' | 'contained' | 'grayed' | 'link' | 'flat';
}

export const Button: React.FC<MaterialButtonProps> = ({
  children,
  className,
  variant = 'contained',
  startIcon = null,
  endIcon = null,
  ...props
}) => {
  const classes = useButtonStyles();
  return (
    <MaterialButton
      className={classNames(classes[variant], className)}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {children}
    </MaterialButton>
  );
};
