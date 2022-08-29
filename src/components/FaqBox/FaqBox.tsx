import React from 'react';
import { Typography, Box } from '@mui/material';
import { useFaqBoxStyles } from './FaqBox.styles';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const FaqBox = ({ item }: { item: any }) => {
  const classes = useFaqBoxStyles();

  return (
    <Box className={classes.wrapper}>
      <Link href={`/faq/${item.category}`} className={classes.innerWrapper}>
        <a>
          <Typography variant="body1" component="p" className={classes.title}>
            {item.name}
          </Typography>
          <Typography variant="body1" component="p" className={classes.description}>
            {item.description}
          </Typography>
          <Box className={classes.buttonWrapper}>
            <Button variant="contained" size="small" className={classes.button}>
              {item.cta}
            </Button>
          </Box>
        </a>
      </Link>
    </Box>
  );
};
